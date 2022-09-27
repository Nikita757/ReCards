import express from "express";

export async function dashboard(req: any, res: express.Response) {
  console.log(req);

  if (!req.session.key) {
    res.send("unauthorized");
    return;
  }
  res.send("mew");
}

export async function login(req: any, res: any) {
  console.log(req);
  req.session.key = "pip3 kek";

  res.send("mew");
}

export async function logout(req: express.Request, res: express.Response) {
  console.log(req.session);
  req.session.destroy((err: any) => {
    if (err) {
      console.log(err);
      res.status(500).json({
        error: "internal server error",
      });
    } else {
      res.status(200).json({
        message: "logged out successfuly",
      });
    }
  });
}
