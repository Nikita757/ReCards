"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.logout = exports.register = exports.login = exports.dashboard = void 0;
const db_1 = require("../db/db");
const crypto_1 = __importDefault(require("crypto"));
function hashPassword(password) {
    return __awaiter(this, void 0, void 0, function* () {
        const salt = crypto_1.default.randomBytes(16).toString("hex");
        return {
            hash: crypto_1.default.pbkdf2Sync(password, salt, 1000, 64, `sha512`).toString(`hex`),
            salt: salt,
        };
    });
}
function validPassword(password, hash, salt) {
    return __awaiter(this, void 0, void 0, function* () {
        const newHash = crypto_1.default
            .pbkdf2Sync(password, salt, 1000, 64, `sha512`)
            .toString(`hex`);
        return newHash === hash;
    });
}
function dashboard(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        console.log(req);
        if (!req.session.key) {
            res.send("unauthorized");
            return;
        }
        res.send("authorized");
    });
}
exports.dashboard = dashboard;
function login(req, res) {
    var _a, _b;
    return __awaiter(this, void 0, void 0, function* () {
        if (((_a = req.body) === null || _a === void 0 ? void 0 : _a.username) && ((_b = req.body) === null || _b === void 0 ? void 0 : _b.password)) {
            try {
                const queryResult = yield (0, db_1.selectUser)({
                    username: req.body.username,
                });
                console.log("KEK");
                console.log(yield hashPassword(req.body.password));
                if (queryResult &&
                    (yield validPassword(req.body.password, queryResult.password, queryResult.salt))) {
                    console.log("KEK");
                    req.session.key = req.body.username;
                    res.status(200).send();
                }
                else {
                    res.status(401).send();
                }
            }
            catch (err) {
                console.log(err);
                res.status(400).send();
            }
        }
        else {
            res.status(400).json({ message: "Body does not contain required data" });
        }
    });
}
exports.login = login;
function register(req, res) {
    var _a, _b, _c;
    return __awaiter(this, void 0, void 0, function* () {
        if (((_a = req.body) === null || _a === void 0 ? void 0 : _a.username) && ((_b = req.body) === null || _b === void 0 ? void 0 : _b.password) && ((_c = req.body) === null || _c === void 0 ? void 0 : _c.email)) {
            try {
                console.log(yield hashPassword(req.body.password));
                const { hash, salt } = yield hashPassword(req.body.password);
                yield (0, db_1.insertUser)({
                    username: req.body.username,
                    password: hash,
                    email: req.body.email,
                    salt: salt,
                });
                req.session.key = req.body.username;
                res.status(200).send();
            }
            catch (err) {
                res.status(400).send();
            }
        }
        else {
            res.status(400).send("Body does not contain required data");
        }
    });
}
exports.register = register;
function logout(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        req.session.destroy((err) => {
            if (err) {
                console.log(err);
                res.status(500).json({
                    error: "Internal server error",
                });
            }
            else {
                res.status(200).json({
                    message: "Logged out successfuly",
                });
            }
        });
    });
}
exports.logout = logout;
//# sourceMappingURL=controllers.js.map