const http = require("http");
const { readFile } = require("fs/promises");
const path = require("path");

const PORT = process.env.PORT ? Number(process.env.PORT) : 3001;
const HOST = process.env.HOST || "0.0.0.0";
const BACKEND_URL = process.env.BACKEND_URL || "http://127.0.0.1:3000";
const PUBLIC_DIR = path.join(__dirname, "public");

const fileCache = new Map();

const contentTypes = {
  ".html": "text/html; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
};

const readStaticFile = async (filePath) => {
  if (fileCache.has(filePath)) {
    return fileCache.get(filePath);
  }

  const data = await readFile(filePath);
  fileCache.set(filePath, data);
  return data;
};

const serveStatic = async (req, res) => {
  const requestPath = req.url === "/" ? "/index.html" : req.url;
  const safePath = path.normalize(requestPath).replace(/^(\.\.(\/|\\|$))+/, "");
  const filePath = path.join(PUBLIC_DIR, safePath);

  try {
    const ext = path.extname(filePath);
    const contentType = contentTypes[ext] || "application/octet-stream";
    const data = await readStaticFile(filePath);
    res.writeHead(200, { "Content-Type": contentType });
    res.end(data);
  } catch (error) {
    res.writeHead(404, { "Content-Type": "text/plain; charset=utf-8" });
    res.end("Not found\n");
  }
};

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

  serveStatic(req, res);
});

server.listen(PORT, HOST, () => {
  console.log(`Frontend listening on http://${HOST}:${PORT}`);
});
