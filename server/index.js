import express from "express";
import mongoose from "mongoose";
import dataRoutes from "./routes/dataRoutes.js";
import * as dotenv from "dotenv";
import cors from "cors";
import path from "path";

dotenv.config();

const app = express();

const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use("/", dataRoutes);

const __dirname = path.resolve();
app.use(express.static(path.join(__dirname, "client/build")));
app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
});

mongoose
  .connect(process.env.MONGO_URL)
  .then(() => {
    console.log("Connected to database successfully");
  })
  .catch((err) => {
    console.log(err.message);
  });

let server = app.listen(PORT, () => {
  console.log(`App is running on: http://localhost:${PORT}`);
});
server.setTimeout(120000);
