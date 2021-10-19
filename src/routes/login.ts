import express from "express";
import User from "../models/user";
import sessions from "express-session";

declare module "express-session" {
  export interface SessionData {
    user: { [key: string]: any };
    userId: { [key: string]: any };
  }
  interface Session {
    user: string;
    isSignedIn: boolean;
  }
}

const router = express.Router();

router.post("/", (req, res) => {
  console.log("Someone just tried to sign in");
  User.findOne({ email: req.body.email }, (err: any, user: any) => {
    if (err || !user || req.body.password !== user.password) {
      console.log("and failed");
      res.json("Incorrect email or password");
    } else {
      console.log("and succeeded");
      req.session.userId = user._id;
      res.json(user);
    }
  });
});

export default router;
