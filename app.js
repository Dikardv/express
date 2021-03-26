export default function appSrc(
  express,
  bodyParser,
  createReadStream,
  crypto,
  http
) {
  const CORS = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET,POST,PUT,PATCH,OPTIONS,DELETE",
  };
  const s = express();
  s.use(bodyParser.urlencoded({ extended: true }))
    .use(bodyParser.json())
    .get("/login/", (req, res) => {
      res.set(CORS);
      res.send("xid1337");
    })

    .get("/code/", (req, res) => {
      res.set(CORS);
      let myReadStream = createReadStream(import.meta.url.substring(10));
      myReadStream.on("data", (c) => res.send(c.toString("utf8")));
    })

    .get("/sha1/:input/", (req, res) => {
      res.set(CORS);
      let { input } = req.params;
      let hash = crypto.createHash("sha1").update(input).digest("hex");
      res.send(hash);
    })

    .get("/req/", (req, res) => {
      res.set(CORS);
      let { addr } = req.query;
      let rawData = "";
      http.get(addr, (resp) => {
        resp.setEncoding("utf8");
        resp.on("data", (chunk) => {
          rawData += chunk;
        });
        resp.on("end", () => {
          res.send(rawData);
        });
      });
    })

    .post("/req/", (req, res) => {
      res.set(CORS);
      let { addr } = req.body;
      let rD = "";
      http.get(addr, (resp) => {
        resp.setEncoding("utf8");
        resp.on("data", (chunk) => {
          rD += chunk;
        });
        resp.on("end", () => {
          res.send(rD);
        });
      });
    })

    .all("*", (r) => {
      r.res.set(CORS);
      r.res.send("xid1337");
    })

    // .listen(process.env.PORT);
    .listen(4321);
}
