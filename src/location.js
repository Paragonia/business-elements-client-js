"use strict";

export default class LocationService {

  constructor() {
    this._initialized = false;
    this._currentLocation = undefined;
    this._watchId = undefined;
  }

  /**
   * Ensure that the location is watched.
   *
   * Watch is preferred over getting the current position in every request:
   *
   * - When asking the user to share the location, the outstanding request is blocked
   * - There is a performance cost on requesting the actual location every time.
   *
   * @private
   */
  _ensureInitialized() {
    if (!this._initialized) {
      this._initialized = true;

      if (!!navigator && !!navigator.geolocation) {
        const options = {
          timeout:60000
        };

        const geoLoc = navigator.geolocation;
        this._watchID = geoLoc.watchPosition(
          (position) => {
            this._currentLocation = {
              latitude: position.coords.latitude,
              longitude: position.coords.longitude
            };
          },
          () => {
            this._currentLocation = null;
          },
          options
        );
      }
    }
  }

  get currentLocation() {
    this._ensureInitialized();

    return new Promise((resolve) => {
      resolve(this._currentLocation);
    });
  }
}
