export default class ResumableEventSource {
  constructor(url) {
    this.listeners = new Map();
    this.keepAliveTimer = undefined;
    this.lastKeepAliveId = 0;
    this.url = url;

    this.connect();
  }

  connect() {
    //The remote part of the url has to be explicitly appended, otherwise the event source will be creates on the same origin.
    this.eventSource = new EventSource(this.url, {withCredentials: true});
    this._handleEvents();
  }

  reconnect() {
    this.eventSource.close();
    if (this.lastKeepAliveId > 0) {
      this.eventSource = new EventSource(this.url + "?lastEventId=" + this.lastKeepAliveId, {withCredentials: true});
    } else {
      this.eventSource = new EventSource(this.url, {withCredentials: true});
    }
    this._handleEvents();
  }

  on(event, listener) {
    // store the listeners to be called later
    this.listeners.set(event.value, listener);
  }

  close() {
    this.eventSource.close();
    clearTimeout(this.keepAliveTimer);
  }

  _handleEvents() {
    this.eventSource.onmessage = (e) => {
      this._keepAlive(e);
      this._fireEventCallback(e);
    };
  }

  _fireEventCallback(e) {
    if (e.data) {
      // parse event payload
      let data = JSON.parse(e.data);
      // get the event name for the event data payload
      let eventName = data.name;
      // get the listener register for this specific event
      let eventCallback = this.listeners.get(eventName);
      // invoke the listener
      if (eventCallback && typeof(eventCallback) === "function") {
        eventCallback(data.data);
      }
    }
  }

  _keepAlive(e) {
    this.lastKeepAliveId = e.lastEventId;
    if (this.keepAliveTimer != null) {
      clearTimeout(this.keepAliveTimer);
    }
    this.keepAliveTimer = setTimeout(() => {
      this.reconnect();
    }, 31000);
  }
}
