const SerialPort = require("serialport");

SerialPort.list().then(
  ports =>
    ports
      .filter(
        ({ path, manufacturer }) => Boolean(path) && Boolean(manufacturer)
      )
      .forEach(console.log),
  err => console.error(err)
);
