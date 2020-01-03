const DMX = require("dmx");

// --- Config ---
// @see https://github.com/node-dmx/dmx#dmxregisterdrivername-module
const module = "enttec-usb-dmx-pro";
// @see https://github.com/node-dmx/dmx#dmxadduniversename-driver-device_id-options
const deviceId = "";
const deviceOptions = {};
// @see https://github.com/node-dmx/dmx#dmxupdateuniverse-channels
const updateToChannels = {};
// --- End Config ---

const dmx = new DMX();

dmx.registerDriver("enttec-driver", module);
dmx.addUniverse("default-universe", "enttec-driver", deviceId, deviceOptions);

dmx.update("default-universe", updateToChannels);
