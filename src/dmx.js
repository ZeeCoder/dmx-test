const DMX = require("dmx");
const SerialPort = require("serialport");

const dmx = new DMX();

const initialise = async ({ driverName, deviceId, deviceOptions }) => {
  if (!deviceId) {
    const deviceIds = await getDeviceIds();
    if (!deviceIds.length) {
      throw new Error(
        `Failed to find DMX device ID. (Expected to find COM3, COM4 or something similar)`
      );
    }

    deviceId = deviceIds[0];
    console.log(`Using the "${deviceId}" found for the DMX.`);
  }

  dmx.addUniverse("default-universe", driverName, deviceId, deviceOptions);
};

const update = channels => {
  dmx.update("default-universe", channels);
};

const getDeviceIds = () =>
  SerialPort.list().then(ports =>
    ports
      .filter(
        ({ comName, path, manufacturer }) =>
          (Boolean(comName) || Boolean(path)) && Boolean(manufacturer)
      )
      .map(({ comName, path }) => comName || path)
  );

module.exports = {
  initialise,
  update,
  getDeviceIds
};
