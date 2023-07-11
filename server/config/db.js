import mongoose from "mongoose";
import { infoLogger, errorLogger } from "../logger/logger.js";

const connectDB = () => {
  mongoose
    .connect(
      "mongodb+srv://mhmdxx5:mhmd223@cluster0.ebxix.mongodb.net/Employee"
    )
    .then(() => infoLogger.info(`Datebase Connected`))
    .catch((error) => errorLogger.error(error.message));
};
export default connectDB;

