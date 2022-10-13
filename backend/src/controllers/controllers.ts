import express from "express";
import {
  insertUser,
  selectUser,
  insertDeck,
  insertCard,
  selectDecks,
  selectCards,
} from "../db/db";
import crypto from "crypto";

// TODO: Data validation

async function hashPassword(password: string) {
  const salt = crypto.randomBytes(16).toString("hex");

  return {
    hash: crypto.pbkdf2Sync(password, salt, 1000, 64, `sha512`).toString(`hex`),
    salt: salt,
  };
}

async function validPassword(password: string, hash: string, salt: string) {
  const newHash = crypto
    .pbkdf2Sync(password, salt, 1000, 64, `sha512`)
    .toString(`hex`);
  return newHash === hash;
}

export async function dashboard(req: any, res: express.Response) {
  if (!req.session.key) {
    res.status(401).send("unauthorized");
    return;
  }
  res.send("authorized");
}

export async function login(req: any, res: express.Response) {
  if (!req.body?.username && req.body?.password) {
    res.status(400).json({ message: "Body does not contain required data" });
    return;
  }

  try {
    const queryResult = await selectUser({
      username: req.body.username,
    });

    console.log(await hashPassword(req.body.password));
    if (
      queryResult &&
      (await validPassword(
        req.body.password,
        queryResult.password,
        queryResult.salt
      ))
    ) {
      req.session.key = req.body.username;
      res.status(200).send();
    } else {
      res.status(401).send();
    }
  } catch (err: any) {
    console.log(err);
    res.status(400).send();
  }
}

export async function register(req: any, res: express.Response) {
  if (!(req.body?.username && req.body?.password)) {
    res.status(400).send("Body does not contain required data");
    console.log("hello");
    return;
  }

  try {
    console.log(await hashPassword(req.body.password));

    const { hash, salt } = await hashPassword(req.body.password);
    await insertUser({
      username: req.body.username,
      password: hash,
      salt: salt,
    });
    req.session.key = req.body.username;
    res.status(200).send();
  } catch (err: any) {
    res.status(400).send();
  }
}

export async function logout(req: express.Request, res: express.Response) {
  req.session.destroy((err: any) => {
    if (err) {
      console.log(err);
      res.status(500).json({
        error: "Internal server error",
      });
    } else {
      res.status(200).json({
        message: "Logged out successfuly",
      });
    }
  });
}

export async function createDeck(req: any, res: express.Response) {
  if (!req.body?.name) {
    res.status(400).send("Body does not contain required data");
    return;
  } else if (!req.session.key) {
    res.status(401).send("unauthorized");
    return;
  }

  try {
    await insertDeck({ creator: req.session.key, name: req.body.name });
    res.status(200).send();
  } catch (err: any) {
    res.status(400).send();
  }
}

export async function createCard(req: any, res: express.Response) {
  if (!(req.body?.question && req.body?.answer && req.body?.deck_id)) {
    res.status(400).send("Body does not contain required data");
  } else if (!req.session.key) {
    res.status(401).send("unauthorized");
    return;
  }

  try {
    await insertCard({
      question: req.body.question,
      answer: req.body.answer,
      deck_id: req.body.deck_id,
    });
    res.status(200).send();
  } catch (err: any) {
    res.status(400).send();
  }
}

export async function getDecks(req: any, res: express.Response) {
  if (!req.session.key) {
    res.status(401).send("unauthorized");
    return;
  }

  try {
    const result = await selectDecks(req.session.key);

    res.status(200).send(result);
  } catch (err: any) {
    res.status(400).send();
  }
}

export async function getCards(req: any, res: express.Response) {
  if (!req.body?.deck_id) {
    res.status(400).send("Body does not contain required data");
  } else if (!req.session.key) {
    res.status(401).send("unauthorized");
    return;
  }

  try {
    const result = await selectCards("3");
    res.status(200).send(result);
  } catch (err: any) {
    res.status(400).send();
  }
}
