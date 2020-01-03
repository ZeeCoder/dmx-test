const DMX = require("dmx");

// --- Config ---
// @see https://github.com/node-dmx/dmx#dmxregisterdrivername-module
const driverName = "enttec-usb-dmx-pro";
// @see https://github.com/node-dmx/dmx#dmxadduniversename-driver-device_id-options
const deviceId = "your device id here";
const deviceOptions = {};
// @see https://github.com/node-dmx/dmx#dmxupdateuniverse-channels
const updateToChannels = {};
// --- End Config ---

const dmx = new DMX();

dmx.addUniverse("default-universe", driverName, deviceId, deviceOptions);

dmx.update("default-universe", updateToChannels);
