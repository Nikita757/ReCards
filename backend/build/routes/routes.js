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
    origin: "https://recards.gotsreact.com",
    credentials: true,
    allowedHeaders: [
        "Cookie",
        "Content-Type",
        "X-Requested-With",
        "X-HTTP-Method-Override",
        "Accept",
    ],
    exposedHeaders: "Set-Cookie",
};
exports.userRouter.use((0, cors_1.default)(CorsOptions));
exports.userRouter.post("/login", controllers_1.login);
exports.userRouter.post("/register", controllers_1.register);
exports.userRouter.post("/logout", controllers_1.logout);
exports.userRouter.get("/dashboard", controllers_1.dashboard);
exports.userRouter.post("/createDeck", controllers_1.createDeck);
exports.userRouter.post("/createCard", controllers_1.createCard);
exports.userRouter.get("/getDecks", controllers_1.getDecks);
exports.userRouter.get("/getCards", controllers_1.getCards);
exports.default = exports.userRouter;
//# sourceMappingURL=routes.js.map