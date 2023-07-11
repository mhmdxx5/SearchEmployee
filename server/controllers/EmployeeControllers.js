import Employee from "../models/EmployeeModel.js";
import { infoLogger, errorLogger } from "../logger/logger.js";


const AddEmployee = async (req, res, next) => {
  try {
    const { id, name, photo, role } = req.body;

    const newEmployee = new Employee({
      id,
      name,
      photo,
      role,
    });
    await newEmployee.save();
    infoLogger.info(`Employee added successfully`);
    return res.json({ message: "Employee added successfully" });
  } catch (error) {
    errorLogger.error(`Failed to add employee ${error}.`);
    return res.status(500).json({ "message":`Failed to add employee ${error}.`});
  }
};

const getALLEmployees = async (req, res, next) => {
  try {
    const employees = await Employee.find().sort({ name: 1 });
    infoLogger.info(`employees has been fetched successfully`);
    return res.json(employees);
  } catch (error) {
    errorLogger.error(`Failed to fetch employees ${error}.`);
    return res.status(500).json({ "message": `Failed to fetch employees ${error}.`});
  }
};

const getEmployee = async (req, res, next) => {
  try {
    const employee = await Employee.findById(req.params.id);
    if (!employee) {
      errorLogger.error(`Employee ${req.params.id} not found.`);
      return res.status(404).json({ "message": `Employee ${req.params.id} not found.` });
    }
    infoLogger.info(`employee ${req.params.id} has been fetched successfully`);
    return res.json(employee);
  } catch (error) {
    errorLogger.error(`Failed to fetch employee ${req.params.id}.`);
    return res.status(500).json({ "message": `Failed to fetch employee ${req.params.id}.` });
  }
};

const updateEmployee = async (req, res, next) => {
  const { id, name, photo, role } = req.body;
  try {
    const updatedEmployee = await Employee.findByIdAndUpdate(req.params.id, {
      id,
      name,
      photo,
      role,
    }, { new: true });

    if (!updatedEmployee) {
      errorLogger.error(`Employee ${req.params.id} not found.`);
      return res.status(404).json({ "message": `Employee ${req.params.id} not found.` });
    }
    infoLogger.info(`employee ${req.params.id} updated successfully`);
    return res.status(200).json({ "message": `employee ${req.params.id} updated successfully` });
  } catch (error) {
    errorLogger.error(`Failed to update employee:${req.params.id}.`);
    return res.status(500).json({ "message": `Failed to update employee:${req.params.id}.`});
  }
};

const deleteEmployee = async (req, res, next) => {
  try {
    const deletedEmployee = await Employee.findByIdAndDelete(req.params.id);
    if (!deletedEmployee) {
      errorLogger.error(`Employee ${req.params.id} not found.`);
      return res.status(404).json({ "message": `Employee ${req.params.id} not found.` });
    }
    infoLogger.info(`employee ${req.params.id} deleted successfully`);
    return res.json({ message: `Employee deleted successfully` });
  } catch (error) {
    errorLogger.error(`Failed to delete employee:${req.params.id}.`);
    return res.status(500).json({ "message": `Failed to delete employee:${req.params.id}.`});
  }
};

export {
  AddEmployee,
  getALLEmployees,
  getEmployee,
  updateEmployee,
  deleteEmployee,
};