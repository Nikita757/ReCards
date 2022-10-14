import session from "express-session";
import Redis from "ioredis";
import connectRedis from "connect-redis";
import * as dotenv from "dotenv";

dotenv.config();
const redisStore = connectRedis(session);
const redisClient = new Redis(process.env.REDIS_URI!);

export { redisClient, redisStore };
