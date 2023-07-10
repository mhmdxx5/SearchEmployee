import express from "express";
const employeesResultsrouter = express.Router();
import {
  AddEmployee,
  getALLEmployees,
  getEmployee,
  deleteEmployee,
  updateEmployee,
} from "../controllers/EmployeeControllers.js";

employeesResultsrouter.post("/addEmployees", AddEmployee);
employeesResultsrouter.get("/", getALLEmployees);
employeesResultsrouter.get("/:id", getEmployee);
employeesResultsrouter.put("/updateEmployees/:id", updateEmployee);
employeesResultsrouter.delete("/deleteEmployees/:id", deleteEmployee);
// we need here just the get function i added all the crud

export default employeesResultsrouter;
