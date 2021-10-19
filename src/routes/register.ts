import express from "express";
import User from "../models/user";

const router = express.Router();

router.get("/", (req, res) => {
  res.json("Getting all of the registeration");
});

router.post("/", (req, res) => {
  const userData = new User(req.body);

  userData.save((err: any) => {
    if (err) {
      let errorMessage: string = "Oh no something wrong happened";
      if (err.code === 11000) {
        errorMessage = "Email is already in use";
      }
      return res.json({ error: errorMessage });
    }
    res.json("Successfully created!");
    //Once the HTML is built remove the above code and call the below code instead//
    res.redirect("/dashboard");
  });
});

export default router;
