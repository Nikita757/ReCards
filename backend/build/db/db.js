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
exports.selectCards = exports.selectDecks = exports.insertCard = exports.insertDeck = exports.selectUser = exports.insertUser = void 0;
const pg_1 = require("pg");
const config_1 = require("../config/config");
const client = new pg_1.Client(config_1.DB_URI);
(() => __awaiter(void 0, void 0, void 0, function* () { return yield client.connect(); }))();
function insertUser({ username, password, salt, }) {
    return __awaiter(this, void 0, void 0, function* () {
        const dbQuery = "INSERT INTO users(username, password, salt) VALUES($1, $2, $3) RETURNING *";
        const values = [username, password, salt];
        yield client.query(dbQuery, values);
    });
}
exports.insertUser = insertUser;
function selectUser({ username }) {
    return __awaiter(this, void 0, void 0, function* () {
        const dbQuery = "SELECT * FROM users WHERE username=$1";
        const values = [username];
        const res = yield client.query(dbQuery, values);
        return res.rows[0];
    });
}
exports.selectUser = selectUser;
function insertDeck({ creator, name, }) {
    return __awaiter(this, void 0, void 0, function* () {
        const dbQuery = "INSERT INTO decks(creator, name) VALUES($1, $2) RETURNING *";
        const values = [creator, name];
        yield client.query(dbQuery, values);
    });
}
exports.insertDeck = insertDeck;
function insertCard({ question, answer, deck_id, }) {
    return __awaiter(this, void 0, void 0, function* () {
        const dbQuery = "INSERT INTO cards(question, answer, deck_id) VALUES($1, $2, $3) RETURNING *";
        const values = [question, answer, deck_id];
        yield client.query(dbQuery, values);
    });
}
exports.insertCard = insertCard;
function selectDecks(creator) {
    return __awaiter(this, void 0, void 0, function* () {
        const dbQuery = "SELECT * from decks WHERE creator=$1";
        const values = [creator];
        return (yield client.query(dbQuery, values)).rows;
    });
}
exports.selectDecks = selectDecks;
function selectCards(deck_id) {
    return __awaiter(this, void 0, void 0, function* () {
        console.log(deck_id);
        const dbQuery = "SELECT * from cards WHERE deck_id=$1";
        const values = [deck_id];
        return (yield client.query(dbQuery, values)).rows;
    });
}
exports.selectCards = selectCards;
(() => __awaiter(void 0, void 0, void 0, function* () { }))();
//# sourceMappingURL=db.js.map