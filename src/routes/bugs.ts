import express from "express";
import bugSchema from "../models/bug";

const router = express.Router();

router.get("/", (req, res) => {
  res.send("we are on home");
});
router.post("/", (req, res) => {
  const bug = new bugSchema({
    description: req.body.description,
    postedBy: req.body.postedBy,
  });
});

export default router;
