import mongoose from "mongoose";

const employeesSchema = new mongoose.Schema(
  {
    id: { type: String },
    name: { type: String },
    role: { type: String },
    photo: { type: String },
  },
  { timestamps: true }
);

export default mongoose.model("Employee", employeesSchema);
