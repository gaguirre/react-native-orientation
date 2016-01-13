var Orientation = require('react-native').NativeModules.Orientation;
var DeviceEventEmitter = require('react-native').DeviceEventEmitter;

var listeners = {};
var deviceEvent = "orientationDidChange";

module.exports = {
  getOrientation(cb) {
    Orientation.getOrientation((error,orientation) =>{
      cb(error, orientation);
    });
  },
  lockToPortrait() {
    Orientation.lockToPortrait();
  },
  lockToLandscape() {
    Orientation.lockToLandscape();
  },
  lockToReverseLandscape() {
    Orientation.lockToReverseLandscape();
  },
  unlockAllOrientations() {
    Orientation.unlockAllOrientations();
  },
  addOrientationListener(cb) {
    listeners[cb] = DeviceEventEmitter.addListener(deviceEvent,
      (body) => {
        cb(body.orientation);
      });
  },
  removeOrientationListener(cb) {
    if (!listeners[cb]) {
      return;
    }
    listeners[cb].remove();
    listeners[cb] = null;
  }
}
