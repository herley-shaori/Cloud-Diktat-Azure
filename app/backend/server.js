const http = require("http");

const PORT = process.env.PORT ? Number(process.env.PORT) : 3000;

const server = http.createServer((req, res) => {
  res.writeHead(200, { "Content-Type": "text/plain; charset=utf-8" });
  res.end("hello world from backend\n");
});

server.listen(PORT, () => {
  console.log(`Backend listening on http://localhost:${PORT}`);
});
