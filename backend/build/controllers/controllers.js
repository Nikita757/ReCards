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
Object.defineProperty(exports, "__esModule", { value: true });
exports.logout = exports.login = exports.dashboard = void 0;
function dashboard(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        console.log(req);
        if (!req.session.key) {
            res.send("unauthorized");
            return;
        }
        res.send("mew");
    });
}
exports.dashboard = dashboard;
function login(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        console.log(req);
        req.session.key = "pip3 kek";
        res.send("mew");
    });
}
exports.login = login;
function logout(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        console.log(req.session);
        req.session.destroy((err) => {
            if (err) {
                console.log(err);
                res.status(500).json({
                    error: "internal server error",
                });
            }
            else {
                res.status(200).json({
                    message: "logged out successfuly",
                });
            }
        });
    });
}
exports.logout = logout;
//# sourceMappingURL=controllers.js.map