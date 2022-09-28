import session from "express-session";
import Redis from "ioredis";
import connectRedis from "connect-redis";
import { REDIS_URI } from "../config/config";

const redisStore = connectRedis(session);
const redisClient = new Redis(REDIS_URI);

export { redisClient, redisStore };
