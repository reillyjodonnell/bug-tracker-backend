import express from "express";
import bugPost from "../models/bug";
import userPost from "../models/user";

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

router.get("/", async (req, res) => {
  try {
    const data = await bugPost.find();
    res.json(data);
  } catch (err) {
    res.json(err);
  }
});

router.post("/", async (req, res) => {
  const bug = new bugPost({
    description: req.body.description,
    postedBy: req.body.postedBy,
  });
  try {
    const post = await bug.save();
    console.log(post);
    console.log(bug.postedBy);
    //Now we need to update the count found in the user's data
    // const updatedUserData = await userPost.findByIdAndUpdate({

    // })
    res.json(post);
  } catch (err) {
    res.json(err);
  }
});

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
router.get("/:postId", async (req, res) => {
  try {
    const data = await bugPost.findById(req.params.postId);
    res.json(data);
  } catch (err) {
    res.json(err);
  }
});

router.patch("/:postId", async (req, res) => {
  //put the array into their own variables
  try {
    const updatedData = await bugPost.findByIdAndUpdate(
      req.params.postId,
      req.body,
      { new: true }
    );
    res.json(updatedData);
  } catch (err) {
    res.json(err);
  }
});

router.delete("/:postId", async (req, res) => {
  try {
    const deletedItem = await bugPost.deleteOne({ _id: req.params.postId });
    res.json(
      `Successfully deleted the document with the id ${req.params.postId}`
    );
  } catch (err) {
    res.json(err);
  }
});

export default router;
