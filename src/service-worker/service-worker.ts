import { 
  CacheUpdatedMessage,
  createCacheUpdatedMessage,
  MessageTypes,
  NotificationMessage,
  ServiceWorkerMessage,
} from "./messages.ts";

//HACK
declare var self: ServiceWorkerGlobalScope;

const APP_CACHE_NAME = "test-deno-pwa-1";
const APP_CACHE_VERSION = "1";
const CACHEABLE_URL_PATTERNS = /^(file|http|https):\/\/(.+)$/i;

self.addEventListener('install', (evt: any) => {
  console.log("Hooray, service worker installed!", evt);
  evt.waitUntil(
      cacheAssets()
  );
});

self.addEventListener('activate', (evt: any) => {
  evt.waitUntil(
    syncCacheVersion()
      .then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', (evt: any) => {
  // HACK: Workaround for https://bugs.chromium.org/p/chromium/issues/detail?id=823392
  if (evt.request.cache === 'only-if-cached' && evt.request.mode !== 'same-origin') {
    return;
  }

  evt.respondWith(
    getResponse(evt.request as Request)
  )
});

self.addEventListener('message', (evt: any) => {
  let knownEvent = false;
  if ("messageType" in evt.data) {
    switch (evt.data.messageType) {
      case MessageTypes.Hello:
        console.log(`Got ${evt.data.messageType} event from:`, evt.data.from);
        knownEvent = true;
        break;
      case MessageTypes.CacheUpdated:
        console.log(`Got ${evt.data.messageType} event:`, evt.data);
        knownEvent = true;
        break;
      default:
        break;
    }
  }
  if (!knownEvent) {
    console.log("Got message event:", evt);
  }
});

self.addEventListener('push', (evt: any) => {
  console.log("Push notification received:", evt);
  evt.text().then((text: string) => {
    const notifMsg = <NotificationMessage> { from: `${evt.source}`, text };
    return dispatchMessage(self.clients, notifMsg);
  })
});

function getFullCacheName(): string {
  return `${APP_CACHE_NAME}-v${APP_CACHE_VERSION}`
}

function syncCacheVersion(): Promise<boolean> {
  if (!("caches" in self)) {
    return Promise.resolve(false);
  }

  const currentCacheName = getFullCacheName();

  return self.caches.keys()
    .then((cacheNames: string[]) => Promise.all(
      cacheNames
        .filter((cacheName: string) => (cacheName != currentCacheName))
        .map((cacheName: string) => caches.delete(cacheName))
    ))
    .then(() => true)
}

function cacheAssets(): Promise<boolean> {
  if (!("caches" in self)) {
    return Promise.resolve(false);
  }

  console.log("Precaching app assets");

  return self.caches.open(getFullCacheName())
    .then((cache: any) => {
      return cache.addAll([
        '/',
        '/index.html',
        '/favicon.png',
        '/assets/css/styles.css',
        '/assets/css/qp-default.css',
        '/assets/css/index.css',
        '/assets/img/loading.gif',
        '/assets/img/splash.png',
      ]);
    })
    .then(() => true)
    .catch((err: Error) => {
      console.error(err);
      return false
    })
}

function getResponse(request: Request): Promise<Response> {
  return tryGetResponseFromCache(request)
    .then((cachedResponse?: Response) => {
      let liveResponse = fetch(request)
        .then((response) => {
          return saveResponseToCache(request, response.clone())
            .then((success) => {
              (success) && dispatchCacheUpdated(self.clients, request, response.clone());
              return response
            })
        });

      return cachedResponse || liveResponse;
    })
}

function tryGetResponseFromCache(request: Request): Promise<Response | undefined> {
  if (!("caches" in self)) {
    return Promise.resolve(undefined);
  }

  return self.caches.open(getFullCacheName())
    .then((cache: any) => cache.match(request))
}

function saveResponseToCache(request: Request, response: Response): Promise<boolean> {
  if (!("caches" in self)) {
    return Promise.resolve(false);
  }
  if (!CACHEABLE_URL_PATTERNS.test(request.url)) {
    return Promise.resolve(false);
  }

  console.log("Saving response to cache:", response);

  return self.caches.open(getFullCacheName())
    .then((cache: any) => cache.put(request, response))
    .then(() => true)
}

function dispatchCacheUpdated(clients: any, request: Request, response: Response): Promise<Response> {
  return createCacheUpdatedMessage(getFullCacheName(), request, response)
    .then((msg) => dispatchMessage(clients, msg))
    .then(() => response)
}

function dispatchMessage(clients: any, msg: ServiceWorkerMessage): Promise<boolean> {
  return clients.matchAll()
    .then((matchedClients: any[]) => {
      matchedClients.forEach((client: any) => client.postMessage(msg));
      return true
    })
}
