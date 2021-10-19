import express from "express";
import env from "dotenv";
import mongoose from "mongoose";
import bugRoute from "./routes/bugs";
import userRoute from "./routes/users";
import registerRouter from "./routes/register";
import loginRouter from "./routes/login";
import session, { Cookie } from "express-session";
import cors from "cors";
import cookieParser from "cookie-parser";
//Get the .env file and grab the variables
env.config();

const mongooseURI: any = process.env.MONGOOSE_URI;

const secretKey: any = process.env.SECRET_SESSION_KEY;

const connectToDB = async () => {
  await mongoose
    .connect(mongooseURI)
    .then(() => {
      console.log("connected to the database!");
    })
    .catch((err) => {
      console.log(err);
    });
};
connectToDB();

const app = express();
app.use(cookieParser());

const corsOptions = {
  origin: true,
  credentials: true, //access-control-allow-credentials:true
  optionSuccessStatus: 200,
};

app.use(cors(corsOptions));
app.use(
  session({
    resave: false,
    saveUninitialized: false,
    secret: secretKey,
    name: "session",
    cookie: {
      //5 minutes in milliseconds
      maxAge: 120000,
    },
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const port = process.env.PORT || 4000;

app.use("/bug", bugRoute);
app.use("/user", userRoute);
app.use("/register", registerRouter);
app.use("/login", loginRouter);

app.get("/", (req: any, res: any) => {
  console.log("Someone is trying to access with GET request");
  res.send("Hello from Express");
});

app.post("/", (req: any, res: any) => {
  console.log(req.body);
  res.status(201).send("Hey! Nice POST request :)");
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
