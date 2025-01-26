import express from "express";
import dbConnect from "./db/db";
import cors from "cors";
import dotenv from "dotenv";
// router import
import { userRouter } from "./routes/user";
import { feedbackRouter } from "./routes/feedback";
import { AdminRouter } from "./routes/company";

dotenv.config();
dbConnect();

const app = express();
app.use(express.json());
app.use(cors());

app.use("/api/v1/user", userRouter);
app.use("/api/v1/feedback", feedbackRouter);
app.use("/api/v1/company", AdminRouter);

app.get("/", (req, res) => {
  res.sendFile("./index.html");
});

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});

// export default app;
