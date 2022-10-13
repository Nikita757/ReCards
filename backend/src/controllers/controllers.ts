import express from "express";
import { insertUser, selectUser } from "../db/db";
import crypto from "crypto";

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

export async function login(req: any, res: any) {
  if (req.body?.username && req.body?.password) {
    try {
      const queryResult = await selectUser({
        username: req.body.username,
      });

      console.log("KEK");
      console.log(await hashPassword(req.body.password));
      if (
        queryResult &&
        (await validPassword(
          req.body.password,
          queryResult.password,
          queryResult.salt
        ))
      ) {
        console.log("KEK");
        req.session.key = req.body.username;
        res.status(200).send();
      } else {
        res.status(401).send();
      }
    } catch (err: any) {
      console.log(err);
      res.status(400).send();
    }
  } else {
    res.status(400).json({ message: "Body does not contain required data" });
  }
}

export async function register(req: any, res: any) {
  if (req.body?.username && req.body?.password && req.body?.email) {
    try {
      console.log(await hashPassword(req.body.password));

      const { hash, salt } = await hashPassword(req.body.password);
      await insertUser({
        username: req.body.username,
        password: hash,
        email: req.body.email,
        salt: salt,
      });
      req.session.key = req.body.username;
      res.status(200).send();
    } catch (err: any) {
      res.status(400).send();
    }
  } else {
    res.status(400).send("Body does not contain required data");
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
