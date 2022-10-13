"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const express_session_1 = __importDefault(require("express-session"));
const body_parser_1 = __importDefault(require("body-parser"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const redis_1 = require("./cache/redis");
const config_1 = require("./config/config");
const routes_1 = require("./routes/routes");
const connect_timeout_1 = __importDefault(require("connect-timeout"));
const dotenv = __importStar(require("dotenv"));
dotenv.config();
let appPort;
process.env.PORT ? (appPort = process.env.PORT) : (appPort = "8080");
const app = (0, express_1.default)();
app.use(body_parser_1.default.json());
app.use((0, cookie_parser_1.default)());
app.use(express_1.default.urlencoded({ extended: false }));
app.set("trust proxy", 1);
app.use((0, connect_timeout_1.default)("50s"));
app.use(haltOnTimedout);
function haltOnTimedout(req, res, next) {
    if (!req.timedout)
        next();
    else {
        res.status(408).send("timeout");
    }
}
app.use((0, express_session_1.default)({
    secret: config_1.SESS_SECRET,
    store: new redis_1.redisStore({
        url: config_1.REDIS_URI,
        client: redis_1.redisClient,
        ttl: 1000 * 60 * 60 * 24,
    }),
    cookie: {
        maxAge: 1000 * 60 * 60 * 24,
        httpOnly: true,
        secure: true,
        sameSite: "none"
    },
    saveUninitialized: false,
    resave: false,
}));
app.use(routes_1.userRouter);
const server = app.listen(appPort, () => {
    console.log(`Server started on http://localhost:${appPort}`);
});
exports.default = server;
//# sourceMappingURL=app.js.map