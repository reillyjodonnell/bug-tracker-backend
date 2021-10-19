import express from "express";
import userPost from "../models/user";
import "./bugs";

const router = express.Router();

// router.get("/", (req, res) => {
//   //grab all of the data from the bug schema
//   bugPost
//     .find()
//     .then((data) => {
//       res.json(data);
//     })
//     .catch((err) => {
//       res.json(err);
//     });
// });

// router.get("/", async (req, res) => {
//   try {
//     const data = await userPost.find();
//     res.json(data);
//   } catch (err) {
//     res.json(err);
//   }
// });

// router.post("/", async (req, res) => {
//   const bug = new userPost({
//     username: req.body.username,
//   });
//   try {
//     const post = await bug.save();
//     res.json(post);
//   } catch (err) {
//     res.json(err);
//   }
// });

// router.post("/", (req, res) => {
//   const bug = new bugPost({
//     description: req.body.description,
//     postedBy: req.body.postedBy,
//   });
//   bug
//     .save()
//     .then((data: any) => {
//       res.json(data);
//     })
//     .catch((err: any) => {
//       res.json(err);
//     });
// });

//find specific bug post
router.get("/", async (req, res) => {
  //Parse the cookie
  if (!req.session.userId) {
    res.status(401).send("Invalid token");
  } else {
    var sessionId = req.session.userId;
    try {
      const data = await userPost.findById(sessionId);
      res.json(data);
    } catch (err) {
      res.json(err);
    }
  }
});

// router.patch("/:postId", async (req, res) => {
//   //put the array into their own variables
//   try {
//     const updatedData = await userPost.findByIdAndUpdate(
//       req.params.postId,
//       req.body,
//       { new: true }
//     );
//     res.json(updatedData);
//   } catch (err) {
//     res.json(err);
//   }
// });

export default router;
