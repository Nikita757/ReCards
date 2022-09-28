import express from "express";
import session from "express-session";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import { redisClient, redisStore } from "./cache/redis";
import { SESS_SECRET, REDIS_URI } from "./config/config";
import { userRouter } from "./routes/routes";
import timeout from "connect-timeout";

let appPort: string;
process.env.PORT ? (appPort = process.env.PORT) : (appPort = "8080");

const app = express();

app.use(bodyParser.json());

app.use(cookieParser());

app.use(express.urlencoded({ extended: false }));

app.set("trust proxy", 1);

app.use(timeout("50s"));
app.use(haltOnTimedout);

function haltOnTimedout(req: any, res: any, next: any) {
  if (!req.timedout) next();
  else {
    res.status(408).send("timeout");
  }
}

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
      secure: true,
      sameSite: "none",
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
