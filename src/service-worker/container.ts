import { EventEmitter } from "../deps/events.ts";

import { HelloMessage, ServiceWorkerMessage } from "./messages.ts";

/// <reference path="service-worker-api.d.ts" />

export interface ServiceWorkerContainerConfig {
    scriptUrl: string;
}

const serviceWorkerContainer = {
    register: (config: ServiceWorkerContainerConfig) => {
        if (!('serviceWorker' in navigator)) {
            console.warn("serviceWorker not enabled in navigator:", navigator);
            return undefined;
        }

        const messagesDispatcher = new EventEmitter();

        navigator.serviceWorker.onmessage = (evt: any) => {
            console.log('Message received from SW:', evt.data);
            if (!("messageType" in evt.data)) {
                // Ignore
                return;
            }
            messagesDispatcher.emit(evt.data.messageType, evt.data as ServiceWorkerMessage);
        };

        navigator.serviceWorker.ready.then((registration) => {
            console.log("Service worker ready:", registration);
            if ((!("controller" in navigator.serviceWorker))
                || (!navigator.serviceWorker.controller)) {
                console.warn("navigator.serviceWorker.controller not available");
                return;
            }
            let msg = <HelloMessage> { from: "container" };
            navigator.serviceWorker.controller.postMessage(msg);
        });

        navigator.serviceWorker
            .register(config.scriptUrl, { scope: "/" })
            .then((registration: any) => {
                console.log("Service worker registered:", registration);
                return true;
            })
            .catch((err: Error) => {
                console.error('Error during service worker registration:', err);
            });

        return messagesDispatcher
    },

    unregister: () => {
        if ('serviceWorker' in navigator) {
            navigator.serviceWorker.ready.then((registration: any) => {
                registration.unregister();
            });
        }
    }
}

export default serviceWorkerContainer;
