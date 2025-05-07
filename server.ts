import express, { Request, Response, NextFunction } from "express";
import next from "next";

const port = parseInt(process.env.PORT || "3000", 10);
const dev = process.env.NODE_ENV !== "production";
const app = next({ dev });
const handle = app.getRequestHandler();

console.log("Preparing Next.js app...");

app.prepare().then(() => {
  console.log("Next.js app prepared");


  const server = express();

  // === CORS ミドルウェア ===
  server.use((req: Request, res: Response, next: NextFunction): void => {
    console.log(`Incoming request: ${req.method} ${req.url}`);
    res.setHeader("Access-Control-Allow-Origin", "https://your-project.web.app");
    res.setHeader("Access-Control-Allow-Methods", "GET,POST,OPTIONS");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");

    if (req.method === "OPTIONS") {
      res.status(204).end();
      return;
    }

    next();
  });

  // === Next.js ハンドラにすべてのリクエストを委譲 ===
  server.all("(.*)", (req: Request, res: Response) => {
    return handle(req, res);
  });

  server.listen(port, () => {
    console.log(`> Ready on http://localhost:${port}`);
  });
}).catch((err) => {
  console.error("Error during app.prepare():", err);
});