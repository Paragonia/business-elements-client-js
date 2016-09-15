"use strict";

export default class LocationService {

  constructor() {
  }

  get currentLocation() {
    return new Promise((resolve) => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition((position) => {
          resolve({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude
          });
        }, () => {
          resolve(null);
        }, {
          maximumAge: 5 * 60 * 1000
        });
      } else {
        resolve(null);
      }
    });
  }
}
