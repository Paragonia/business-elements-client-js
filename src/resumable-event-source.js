export default class ResumableEventSource {
  constructor(url) {
    this.listeners = [];
    this.keepAliveTimer = undefined;
    this.lastKeepAliveId = 0;
    this.url = url;

    this.connect();
  }

  connect() {
    //The remote part of the url has to be explicitly appended, otherwise the event source will be creates on the same origin.
    this.eventSource = new EventSource(this.url, {withCredentials: true});
    // register the keep alive timer and track last message id's
    this.listenOnKeepAlive();
  }

  reconnect() {
    this.eventSource.close();
    this.eventSource = new EventSource(this.url + "?lastEventId=" + this.lastKeepAliveId, {withCredentials: true});
    this.listeners.forEach((listener) => {
      this.eventSource.addEventListener(listener[0], listener[1], false);
    });
    this.listenOnKeepAlive();
  }

  keepAlive(){
    if (this.keepAliveTimer != null) {
      clearTimeout(this.keepAliveTimer);
    }
    this.keepAliveTimer = setTimeout(() => {
      this.reconnect();
    }, 6000);
  }

  listenOnKeepAlive() {
    this.eventSource.onmessage = (e) => {
      // keep alive has always the last event Id for an actual event.
      this.lastKeepAliveId = e.lastEventId;
      this.keepAlive();
    };
  }

  on(event, listener) {
    // add listener to event source
    this.eventSource.addEventListener(event.value, listener, false);
    // and track it so that it can be resumed
    this.listeners.push([event.value, listener]);
  }

  close() {
    this.eventSource.close();
  }
}
