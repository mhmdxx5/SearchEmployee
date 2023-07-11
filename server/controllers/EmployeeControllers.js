import Employee from "../models/EmployeeModel.js";
import { infoLogger, errorLogger } from "../logger/logger.js";

// Add a new employee
const AddEmployee = async (req, res, next) => {
  try {
    const { id, name, photo, role } = req.body;

    const newEmployee = new Employee({
      id,
      name,
      photo,
      role,
    });

    // Save the new employee to the database
    await newEmployee.save();
    infoLogger.info(`Employee added successfully`);
    return res.json({ message: "Employee added successfully" });
  } catch (error) {
    // Log and handle errors
    errorLogger.error(`Failed to add employee: ${error}`);
    return res.status(500).json({ "message": `Failed to add employee: ${error}` });
  }
};

// Get all employees
const getALLEmployees = async (req, res, next) => {
  try {
    // Retrieve all employees from the database and sort them by name
    const employees = await Employee.find().sort({ name: 1 });
    infoLogger.info(`Employees have been fetched successfully`);
    return res.json(employees);
  } catch (error) {
    // Log and handle errors
    errorLogger.error(`Failed to fetch employees: ${error}`);
    return res.status(500).json({ "message": `Failed to fetch employees: ${error}` });
  }
};

// Get a specific employee by ID
const getEmployee = async (req, res, next) => {
  try {
    // Find the employee by ID
    const employee = await Employee.findById(req.params.id);
    if (!employee) {
      // If employee is not found, return a 404 status code
      errorLogger.error(`Employee ${req.params.id} not found.`);
      return res.status(404).json({ "message": `Employee ${req.params.id} not found.` });
    }
    infoLogger.info(`Employee ${req.params.id} has been fetched successfully`);
    return res.json(employee);
  } catch (error) {
    // Log and handle errors
    errorLogger.error(`Failed to fetch employee ${req.params.id}: ${error}`);
    return res.status(500).json({ "message": `Failed to fetch employee ${req.params.id}: ${error}` });
  }
};

// Update an employee
const updateEmployee = async (req, res, next) => {
  const { id, name, photo, role } = req.body;
  try {
    // Find and update the employee by ID
    const updatedEmployee = await Employee.findByIdAndUpdate(req.params.id, {
      id,
      name,
      photo,
      role,
    }, { new: true });

    if (!updatedEmployee) {
      // If employee is not found, return a 404 status code
      errorLogger.error(`Employee ${req.params.id} not found.`);
      return res.status(404).json({ "message": `Employee ${req.params.id} not found.` });
    }
    infoLogger.info(`Employee ${req.params.id} updated successfully`);
    return res.status(200).json({ "message": `Employee ${req.params.id} updated successfully` });
  } catch (error) {
    // Log and handle errors
    errorLogger.error(`Failed to update employee ${req.params.id}: ${error}`);
    return res.status(500).json({ "message": `Failed to update employee ${req.params.id}: ${error}` });
  }
};

// Delete an employee
const deleteEmployee = async (req, res, next) => {
  try {
    // Find and delete the employee by ID
    const deletedEmployee = await Employee.findByIdAndDelete(req.params.id);
    if (!deletedEmployee) {
      // If employee is not found, return a 404 status code
      errorLogger.error(`Employee ${req.params.id} not found.`);
      return res.status(404).json({ "message": `Employee ${req.params.id} not found.` });
    }
    infoLogger.info(`Employee ${req.params.id} deleted successfully`);
    return res.json({ message: `Employee deleted successfully` });
  } catch (error) {
    // Log and handle errors
    errorLogger.error(`Failed to delete employee ${req.params.id}: ${error}`);
    return res.status(500).json({ "message": `Failed to delete employee ${req.params.id}: ${error}` });
  }
};

export {
  AddEmployee,
  getALLEmployees,
  getEmployee,
  updateEmployee,
  deleteEmployee,
};
