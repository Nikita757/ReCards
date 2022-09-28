"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.redisStore = exports.redisClient = void 0;
const express_session_1 = __importDefault(require("express-session"));
const ioredis_1 = __importDefault(require("ioredis"));
const connect_redis_1 = __importDefault(require("connect-redis"));
const config_1 = require("../config/config");
const redisStore = (0, connect_redis_1.default)(express_session_1.default);
exports.redisStore = redisStore;
const redisClient = new ioredis_1.default(config_1.REDIS_URI);
exports.redisClient = redisClient;
//# sourceMappingURL=redis.js.map