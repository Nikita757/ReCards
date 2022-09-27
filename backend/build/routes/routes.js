"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userRouter = void 0;
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const controllers_1 = require("../controllers/controllers");
exports.userRouter = express_1.default.Router();
const CorsOptions = {
    origin: "http://127.0.0.1:3000",
    credentials: true,
    allowedHeaders: "Cookie",
    exposedHeaders: "Set-Cookie",
};
exports.userRouter.use((0, cors_1.default)(CorsOptions));
exports.userRouter.get("/login", controllers_1.login);
exports.userRouter.get("/logout", controllers_1.logout);
exports.userRouter.get("/", controllers_1.dashboard);
exports.default = exports.userRouter;
//# sourceMappingURL=routes.js.map