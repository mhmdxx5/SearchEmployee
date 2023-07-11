import express from "express";
import cors from "cors";
import connectDB from "./config/db.js";
import cookieParser from "cookie-parser";
import employeeRoutes from "./routes/EmployeeRoutes.js";
import * as dotenv from "dotenv";
dotenv.config();
const app = express();

// const corsOptions = {
//   origin: "https://64ac614a931d8900814d50c7--resonant-cat-d28ea4.netlify.app/",
//   // origin: "*",
//   credentials: true,
//   //access-control-allow-credentials:true
//   // optionSuccessStatus: 200,
// };
app.use((req, res, next) => {
  console.log(req.method);
  next();
})
const corsConfig = function (req, res, next) {
  res.header('Access-Control-Allow-Origin', 'https://master--resonant-cat-d28ea4.netlify.app');
  res.header('Access-Control-Allow-Credentials', true);
  res.header('Access-Control-Allow-Methods', 'GET,HEAD,OPTIONS,POST,PUT,PATCH,DELETE');
  res.header('Access-Control-Allow-Headers', 'x-access-token, Origin, X-Requested-With, Content-Type, Accept, Authorization');
  if(req.method === 'OPTIONS') {
      return res.status(200).end();
  }
  next();
  
}
app.use(corsConfig);
app.use(express.json({ limit: "50mb" }));

//app.use(cors(corsOptions));

app.use(express.json());

app.use(cookieParser());
connectDB();

//Routes
app.use("/api/employees", employeeRoutes);

app.use((req, res) => {
  res.status(404).json({ "message": "Bad Method Request!" });
});
// Creating Express Server
const PORT = process.env.PORT || 5000;
// const port = 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
