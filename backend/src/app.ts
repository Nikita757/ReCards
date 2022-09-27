// // import express from "express";
// // import session from "express-session";
// // import redisCliend from "./cache/cache";

// // const app = express();

// // app.use(
// //   session({
// //     secret: "hello",
// //     resave: false,
// //     saveUninitialized: false,
// //   })
// // );

// // app.get("/", (req, res) => {
// //   console.log(req);
// //   res.send("Hello Se   s   sion");
// // });

// // app.listen(8080, () => console.log("Server running on http://localhost:8080"));

import express from "express";
import session from "express-session";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import { redisClient, redisStore } from "./cache/redis";
import { SESS_SECRET, REDIS_URI } from "./config/config";
import { userRouter } from "./routes/routes";

let appPort: string;
process.env.PORT ? (appPort = process.env.PORT) : (appPort = "8080");

const app = express();

app.use(bodyParser.json());

app.use(cookieParser());

app.use(express.urlencoded({ extended: false }));

app.set("trust proxy", 1);

app.use(
  session({
    secret: SESS_SECRET,
    store: new redisStore({
      url: REDIS_URI,
      client: redisClient,
      ttl: 60 * 60 * 24,
    }),
    cookie: {
      maxAge: 1000 * 60 * 60 * 24,
      httpOnly: true,
      secure: false,
    },
    saveUninitialized: false,
    resave: false,
  })
);

app.use(userRouter);

const server = app.listen(appPort, () => {
  console.log(`Server started on http://localhost:${appPort}`);
});

export default server;
