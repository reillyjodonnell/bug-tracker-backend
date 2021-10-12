import express from "express";
import env from "dotenv";
import mongoose from "mongoose";

//Get the .env file and grab the variables
env.config();

const mongooseURI: any = process.env.MONGOOSE_URI;

const connectToDB = async () => {
  await mongoose.connect(mongooseURI);
  console.log("connected to database!");
};
//connectToDB();

const app = express();

const port = process.env.PORT || 4000;

app.use(express.json());

app.get("/", (req: any, res: any) => {
  res.send("Hello from Express");
});

app.post("/", (req: any, res: any) => {
  console.log(req.body);
  res.status(201).send("Hey! Nice POST request");
});

app.put("/user", (req: any, res: any) => {
  res.status(200).send("got a PUT request at /user");
});
app.delete("/user", (req: any, res: any) => {
  res.send("got a DELETE request at /user");
});

app.listen(port, () => {
  console.log(`Listening on ${port}`);
});
