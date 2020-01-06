#!/usr/bin/env node
const meow = require("meow");
const server = require("./src/server");
const dmx = require("./src/dmx");

const cli = meow(``);

// --- Config ---
let {
  port = 8899,
  // @see https://github.com/node-dmx/dmx#dmxregisterdrivername-module
  driverName = "enttec-usb-dmx-pro",
  // @see https://github.com/node-dmx/dmx#dmxadduniversename-driver-device_id-options
  deviceId,
  deviceOptions: cliDeviceOptions = "{}"
} = cli.flags;
const deviceOptions = JSON.parse(cliDeviceOptions);
// --- End Config ---

dmx
  .initialise({ driverName, deviceId, deviceOptions })
  .then(() => {
    console.log(`DMX initialised`);

    server
      .start({ port })
      .then(() => {
        console.log(`HTTP server running at port "${port}"`);
      })
      .catch(error =>
        console.error(`Failed to start HTTP server. ${error.stack}`)
      );
  })
  .catch(error => console.error(`Failed to initialise DMX. ${error.stack}`));
