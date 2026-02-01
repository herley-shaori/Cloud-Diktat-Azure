const http = require("http");

const PORT = process.env.PORT ? Number(process.env.PORT) : 3001;
const HOST = process.env.HOST || "0.0.0.0";
const BACKEND_URL = process.env.BACKEND_URL || "http://127.0.0.1:3000";

const server = http.createServer((req, res) => {
  if (req.url === "/api/hello") {
    http
      .get(`${BACKEND_URL}/`, (backendRes) => {
        let body = "";
        backendRes.setEncoding("utf8");
        backendRes.on("data", (chunk) => {
          body += chunk;
        });
        backendRes.on("end", () => {
          res.writeHead(200, { "Content-Type": "text/plain; charset=utf-8" });
          res.end(body);
        });
      })
      .on("error", () => {
        res.writeHead(502, { "Content-Type": "text/plain; charset=utf-8" });
        res.end("backend unavailable\n");
      });
    return;
  }

  res.writeHead(200, { "Content-Type": "text/html; charset=utf-8" });
  res.end(
    "<h1>hello world from frontend</h1>\n" +
      "<p>Backend says: <a href=\"/api/hello\">/api/hello</a></p>\n"
  );
});

server.listen(PORT, HOST, () => {
  console.log(`Frontend listening on http://${HOST}:${PORT}`);
});
