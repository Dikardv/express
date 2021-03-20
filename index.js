const x = require("express");
const app = x();
const CORS = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET,POST,DELETE",
  "Access-Control-Allow-Headers": "Content-Type, Access-Control-Allow-Headers",
};
app
  .get("/a", (r) => r.res.send("ALL OK"))
  .get("/f", (r) =>
    r.res.format({
      "text/html": () => r.res.send("<h2>Res 52</h2>"),
      "application/json": () => r.res.json({ "result:": 42 }),
    })
  )
  .listen(4321, "::1");
