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

// const skipAuthPaths = [
//   "/_next",                 // JS, CSS, 静的ファイルなど
//   "/favicon.ico",           // アイコン
//   "/robots.txt",            // その他公開ファイル
//   "/sitemap.xml",
//   "/manifest.json",
//   "/service-worker.js",
//   "/_next/data",            // データフェッチ
//   "/api/auth",              // ISR用APIや認証関係（あれば）
//   "/static",                // 静的ファイル
// ];

app.prepare().then(() => {
  const server = express();

  // CORS設定
  server.use(cors({
    origin: "https://higapro-180014.web.app", // Firebase Hosting ドメイン
    methods: ["GET", "POST", "OPTIONS"],
    allowedHeaders: ["Authorization", "Content-Type"],
    credentials: true,
  }));

    // トークン検証の共通関数
    async function verifyAndAuthorizeToken(idToken: string | undefined): Promise<any> {
      if (!idToken) throw new Error("Token missing");
  
      const ticket = await oAuthClient.verifyIdToken({
        idToken,
        audience: CLIENT_ID,
      });
  
      const payload = ticket.getPayload();
      if (!payload || !payload.email || !allowedMailAddresses.includes(payload.email)) {
        throw new Error("Unauthorized");
      }
  
      return payload;
    }
  

  // IDトークンを検証するミドルウェア
  server.use(async(req: Request, res: Response, next: NextFunction): Promise<any> => {
  // 静的ファイルには認証スキップ
  // if (skipAuthPaths.some(path => req.path.startsWith(path))) {
  //   return next();
  // }
    try {
      let idToken: string | undefined;

      // クエリパラメータにトークンがある場合（初回）
      if (req.query.id_token) {
        idToken = req.query.id_token as string;

        const payload = await verifyAndAuthorizeToken(idToken);
        res.cookie("id_token", idToken, {
          httpOnly: true,
          secure: true,
          sameSite: "lax",
          maxAge: 60 * 60 * 1000, // 1時間
        });

        (req as any).user = payload;
        return next();
      }


      // Cookie に保存されたトークンを使用（2回目以降）
      if (req.cookies?.id_token) {
        idToken = req.cookies.id_token;

        const payload = await verifyAndAuthorizeToken(idToken);
        (req as any).user = payload;
        return next();
      }

      return res.status(401).send("Token not provided");


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