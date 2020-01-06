const dmx = require("./dmx");
const express = require("express");

const start = ({ port }) =>
  new Promise(resolve => {
    const server = express();
    const router = express.Router();

    server.use(router);
    server.use(
      express.json({
        limit: "100mb"
      })
    );

    server.use((error, req, res, next) => {
      res.status(500).json({ error: String(error.stack) });
    });

    router.get("/", (req, res) => res.json({}));
    router.get("/list", async (req, res) =>
      res.json({ deviceIds: await dmx.getDeviceIds() })
    );
    router.get("/update", (req, res) => {
      const channels = JSON.parse(req.query.channels);

      dmx.update(channels);

      res.json({ response: channels });
    });

    server.get("*", (req, res) => {
      res.status(404).json({ error: "404 Not found" });
    });

    server.listen(port, resolve);
  });

module.exports = { start };
