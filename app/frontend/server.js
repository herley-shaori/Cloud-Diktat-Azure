const http = require("http");

const PORT = process.env.PORT ? Number(process.env.PORT) : 3001;

const server = http.createServer((req, res) => {
  res.writeHead(200, { "Content-Type": "text/html; charset=utf-8" });
  res.end("<h1>hello world from frontend</h1>\n");
});

server.listen(PORT, () => {
  console.log(`Frontend listening on http://localhost:${PORT}`);
});
