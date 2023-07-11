import express from "express";
import cors from "cors";
import connectDB from "./config/db.js";
import cookieParser from "cookie-parser";
import employeeRoutes from "./routes/EmployeeRoutes.js";
import * as dotenv from "dotenv";
import { infoLogger, errorLogger } from "./logger/logger.js";
dotenv.config();
const app = express();


const corsConfig = function (req, res, next) {
  res.header('Access-Control-Allow-Origin', 'https://master--resonant-cat-d28ea4.netlify.app/');
  res.header('Access-Control-Allow-Credentials', true);
  res.header('Access-Control-Allow-Methods', 'GET,HEAD,OPTIONS,POST,PUT,PATCH,DELETE');
  res.header('Access-Control-Allow-Headers', 'x-access-token, Origin, X-Requested-With, Content-Type, Accept, Authorization');
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }
  next();

}
app.use(corsConfig);
app.use(express.json({ limit: "50mb" }));



app.use(express.json());

app.use(cookieParser());
connectDB();

//Routes
app.use("/api/employees", employeeRoutes);

app.use((req, res) => {
  errorLogger.error(`Bad Method Request!:${req.method} ${req.url}`);
  res.status(404).json({ "message": "Bad Method Request!" });
});
// Creating Express Server
const PORT = process.env.PORT || 5000;
// const port = 5000;
app.listen(PORT, () => infoLogger.info(`Server running on port ${PORT}`));
