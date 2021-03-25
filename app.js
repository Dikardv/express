export default function appSrc(
  express,
  bodyParser,
  createReadStream,
  crypto,
  http
) {
  const PORT = 4321;
  const CORS = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET,POST,PUT,PATCH,OPTIONS,DELETE",
    "Access-Control-Allow-Headers": "Content-Type",
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
      res.send(addr);
    })
    // curl 'https://demoapp.kodaktor.ru/req/?addr=http://node-server.online/r/assets/week.txt'
    // 5

    // curl 'https://demoapp.kodaktor.ru/req/' -d 'addr=http://node-server.online/r/assets/week.txt'
    // 5
    //.listen(process.env.PORT);
    .listen(PORT);
}
