import { 
  createCacheUpdatedMessage,
  MessageTypes,
  NotificationMessage,
  ServiceWorkerMessage,
} from "./messages.ts";

// HACK
// deno-lint-ignore no-var
declare var self: ServiceWorkerGlobalScope;

const APP_CACHE_NAME = "quaos-portfolio";
const APP_CACHE_VERSION = "1";
const CACHEABLE_URL_PATTERNS = /^(file|http|https):\/\/(.+)$/i;

self.addEventListener('install', (evt: ExtendableEvent) => {
  console.log("Hooray, service worker installed!", evt);
  evt.waitUntil(
      cacheAssets()
  );
});

self.addEventListener('activate', (evt: ExtendableEvent) => {
  evt.waitUntil(
    syncCacheVersion()
      .then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', (evt: FetchEvent) => {
  // HACK: Workaround for https://bugs.chromium.org/p/chromium/issues/detail?id=823392
  if (evt.request.cache === 'only-if-cached' && evt.request.mode !== 'same-origin') {
    return;
  }

  evt.respondWith(
    getResponse(evt.request as Request)
  )
});

self.addEventListener('message', (evt: ExtendableMessageEvent) => {
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

self.addEventListener('push', async (evt: PushEvent) => {
  console.log("Push notification received:", evt);
  const { data, target } = evt
  const text = await data?.text()
  const notifMsg = <NotificationMessage> { from: `${target}`, text };
  return dispatchMessage(self.clients, notifMsg);
});

function getFullCacheName(): string {
  return `${APP_CACHE_NAME}-v${APP_CACHE_VERSION}`
}

async function syncCacheVersion(): Promise<boolean> {
  if (!("caches" in self)) {
    return false;
  }

  const currentCacheName = getFullCacheName();

  const cacheNames = await self.caches.keys()
  await Promise.all(
    cacheNames
      .filter((cacheName: string) => (cacheName != currentCacheName))
      .map((cacheName: string) => caches.delete(cacheName))
  )

  return true
}

async function cacheAssets(): Promise<boolean> {
  if (!("caches" in self)) {
    return false;
  }

  console.log("Precaching app assets");

  const cache = await self.caches.open(getFullCacheName())
  
  try {
      await cache.addAll([
        '/',
        '/index.html',
        '/favicon.png',
        '/assets/css/index.css',
        '/assets/css/index-print.css',
        '/assets/css/portfolio.css',
        '/assets/css/styles.css',
        '/assets/img/loading.gif',
        '/assets/img/splash.png',
      ]);
      return true;
    } catch (err) {
      console.error(err);
      return false;
    }
}

async function getResponse(request: Request): Promise<Response> {
  const cachedResponse = await tryGetResponseFromCache(request);
  const liveResponse = await fetch(request);
  saveResponseToCache(request, liveResponse.clone())
      .then((success) => {
        success && dispatchCacheUpdated(self.clients, request, liveResponse.clone());
        return liveResponse
      })

  return cachedResponse || liveResponse;
}

async function tryGetResponseFromCache(request: Request): Promise<Response | undefined> {
  if (!("caches" in self)) {
    return undefined;
  }

  const cache = await self.caches.open(getFullCacheName());

  return cache.match(request);
}

async function saveResponseToCache(request: Request, response: Response): Promise<boolean> {
  if (!("caches" in self)) {
    return false;
  }
  if (!CACHEABLE_URL_PATTERNS.test(request.url)) {
    return false;
  }

  console.log("Saving response to cache:", response);

  try {
    const cache = await self.caches.open(getFullCacheName());
    await cache.put(request, response);

    return true;
  } catch (err) {
    console.error(err);
    return false;
  }
}

async function dispatchCacheUpdated(clients: Clients, request: Request, response: Response): Promise<Response> {
  const msg = await createCacheUpdatedMessage(getFullCacheName(), request, response);
  await dispatchMessage(clients, msg);
  
  return response;
}

async function dispatchMessage(clients: Clients, msg: ServiceWorkerMessage): Promise<boolean> {
  const matchedClients = await clients.matchAll();
  matchedClients.forEach((client) => client.postMessage(msg));

  return true;
}
