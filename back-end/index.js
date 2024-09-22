import express from "express";
import cors from "cors";
import router from "./routes/routes.js";
import mongoose from "mongoose";

const app = express();
const PORT = 4000;
const url = "mongodb+srv://yash:yash1234@cluster0.lmpwomg.mongodb.net/";

app.use(cors());
app.use(express.json());

app.use("/", router);

mongoose
  .connect(url, {
    dbName: "hachatron",
    autoIndex: true,
  })
  .then(async () => {
    console.log("MongoDB successfully connected.");
  })
  .catch((err) => console.error(err));

app.listen(PORT, () => console.log(`Sever is running on port ${PORT}`));
