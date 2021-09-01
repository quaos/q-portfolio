//HACK:
declare global {
    var caches: any;
    
    var clients: any;
    
    var navigator: any;

    function postMessage(message: any): any;

    // interface ServiceWorkerMessageEvent {
    //     data: any;
    // }
}

export {};
