import { Client } from "pg";
import { DB_URI } from "../config/config";

const client = new Client(DB_URI);
(async () => await client.connect())();

export async function insertUser({
  username,
  password,
  salt,
}: {
  username: string;
  password: string;
  salt: string;
}): Promise<void> {
  const dbQuery =
    "INSERT INTO users(username, password, salt) VALUES($1, $2, $3) RETURNING *";
  const values = [username, password, salt];

  await client.query(dbQuery, values);
}

export async function selectUser({ username }: { username: string }) {
  const dbQuery = "SELECT * FROM users WHERE username=$1";
  const values = [username];

  const res = await client.query(dbQuery, values);
  return res.rows[0];
}

export async function insertDeck({
  creator,
  name,
}: {
  creator: string;
  name: string;
}) {
  const dbQuery = "INSERT INTO decks(creator, name) VALUES($1, $2) RETURNING *";
  const values = [creator, name];

  await client.query(dbQuery, values);
}

export async function insertCard({
  question,
  answer,
  deck_id,
}: {
  question: string;
  answer: string;
  deck_id: string;
}) {
  const dbQuery =
    "INSERT INTO cards(question, answer, deck_id) VALUES($1, $2, $3) RETURNING *";
  const values = [question, answer, deck_id];

  await client.query(dbQuery, values);
}

export async function selectDecks(creator: string) {
  const dbQuery = "SELECT * from decks WHERE creator=$1";
  const values = [creator];

  return (await client.query(dbQuery, values)).rows;
}

export async function selectCards(deck_id: string) {
  console.log(deck_id);
  const dbQuery = "SELECT * from cards WHERE deck_id=$1";
  const values = [deck_id];

  return (await client.query(dbQuery, values)).rows;
}

(async () => {})();
