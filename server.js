import "express-async-errors";
import * as dotenv from "dotenv";
dotenv.config();
import express from "express";
const app = express();
import morgan from "morgan";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";
import { dirname } from "path";
import { fileURLToPath } from "url";
import path from "path";
const __dirname = dirname(fileURLToPath(import.meta.url));
import cloudinary from "cloudinary";

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_API_SECRET,
});

//custom import
import JobRouter from "./routers/jobRouter.js";
import AuthRouter from "./routers/authRouter.js";
import errorHandlerMiddleware from "./middleware/errorHandlerMiddleware.js";
import { authenticateUser } from "./middleware/authMiddleware.js";
import userRouter from "./routers/userRouter.js";

app.use(express.static(path.resolve(__dirname, "./public")));
app.use(cookieParser());
if (process.env.NODE_ENV === "Development") {
  app.use(morgan("dev"));
}
app.use(express.json());

app.use("/api/v1/jobs", authenticateUser, JobRouter);
app.use("/api/v1/Auth", AuthRouter);
app.use("/api/v1/users", authenticateUser, userRouter);

app.get("/api/v1/test", (req, res) => {
  res.json({ msg: "test route" });
});
7;

app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "./public", "index.html"));
});

app.get("*", (req, res) => {
  res.status(400).json({ msg: "not route found" });
});

app.use(errorHandlerMiddleware);

const PORT = process.env.PORT || 5100;

try {
  await mongoose.connect(process.env.Mongo_URL);
  app.listen(PORT, () => {
    console.log(`server running on PORT ${PORT}....`);
  });
} catch (error) {
  console.log(error);
  process.exit(1);
}
