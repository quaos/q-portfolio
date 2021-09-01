export enum MessageTypes {
    Hello = "hello",
    Notification = "notification",
    CacheUpdated = "cacheUpdated",
}

export interface HelloMessage {
    messageType: MessageTypes.Hello;
    from: string;
}

export interface NotificationMessage {
    messageType: MessageTypes.Notification;
    from: string;
    text: string;
}

export interface RequestProps {
    method: string;
    url: string;
}

// export interface ResponseProps {
//     status: number;
//     jsonBody: string;
// }

export interface CacheUpdatedMessage {
    messageType: MessageTypes.CacheUpdated;
    cacheName: string;
    request: RequestProps;
    // response: ResponseProps;
}

export async function createCacheUpdatedMessage(cacheName: string, request: Request, response: Response) {
    const reqProps = <RequestProps> {
        method: request.method,
        url: request.url,
    };

    // const jsonBody = (response.headers.get() await response.json();
    // const respProps = <ResponseProps> {
    //     status: response.status,
    //     jsonBody,
    // };

    return <CacheUpdatedMessage> {
        cacheName,
        request: reqProps,
        // response: respProps,
    }
}

export type ServiceWorkerMessage =
    HelloMessage
    | CacheUpdatedMessage
    | NotificationMessage;
