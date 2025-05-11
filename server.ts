import express, { Request, Response, NextFunction } from "express";
import { OAuth2Client } from "google-auth-library";
import cors from "cors";
import next from "next";

const dev = process.env.NODE_ENV !== "production";
const app = next({ dev });
const handle = app.getRequestHandler();

const CLIENT_ID = "625917545220-e1dv9l3o9nliphqfvnl40tcqmt82tnre.apps.googleusercontent.com"; // あなたのGISのClient ID
const oAuthClient = new OAuth2Client(CLIENT_ID);

const allowedMailAddresses = ["higa1140@gmail.com"]

app.prepare().then(() => {
  const server = express();

  // CORS設定
  server.use(cors({
    origin: "https://higapro-180014.web.app", // Firebase Hosting ドメイン
    methods: ["GET", "POST", "OPTIONS"],
    allowedHeaders: ["Authorization", "Content-Type"],
    credentials: true,
  }));

  // IDトークンを検証するミドルウェア
  server.use(async(req: Request, res: Response, next: NextFunction): Promise<any> => {
    const idToken = req.query.auth as string;

    
//    const authHeader = req.headers.authorization || "";
//    const match = authHeader.match(/^Bearer (.+)$/);
//    const idToken = match?.[1];

    if (!idToken) {
      return res.status(401).send("Missing ID token");
    }

    try {
      const ticket = await oAuthClient.verifyIdToken({
        idToken,
        audience: CLIENT_ID,
      });

      const payload = ticket.getPayload();

      console.log(JSON.stringify(payload));
      if (!payload || !payload.email) {
        return res.status(403).send("Invalid token");
      }

      if( !allowedMailAddresses.includes(payload.email)  ){
        return res.status(403).send("Invalid address");
      }


      next();
    } catch (err) {
      console.error("Token verification failed:", err);
      return res.status(403).send("Unauthorized");
    }
  });

  // Next.js に処理を渡す
  server.use((req, res) => handle(req, res));

  const port = process.env.PORT || 3000;
  server.listen(port, () => {
    console.log(`> Ready on http://localhost:${port}`);
  });
});