import Employee from "../models/EmployeeModel.js";
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
    return res.json({ message: "Employee added successfully" });
  } catch (error) {
    // Customize the error response message
    return res.status(500).json({ error: "Failed to add employee. Please try again later." });
  }
};

const getALLEmployees = async (req, res, next) => {
  try {
    const employees = await Employee.find().sort({ name: 1 });
    return res.json(employees);
  } catch (error) {
    console.error("Failed to fetch employees:", error);
    return res.status(500).json({ error: "Failed to fetch employees. Please try again later." });
  }
};

const getEmployee = async (req, res, next) => {
  try {
    const employee = await Employee.findById(req.params.id);
    if (!employee) {
      return res.status(404).json({ error: "Employee not found." });
    }
    return res.json(employee);
  } catch (error) {
    console.error("Failed to fetch employee:", error);
    return res.status(500).json({ error: "Failed to fetch employee. Please try again later." });
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
      return res.status(404).json({ error: "Employee not found." });
    }

    return res.status(200).json({ message: `Employee updated successfully` });
  } catch (error) {
    console.error("Failed to update employee:", error);
    return res.status(500).json({ error: "Failed to update employee. Please try again later." });
  }
};

const deleteEmployee = async (req, res, next) => {
  try {
    const deletedEmployee = await Employee.findByIdAndDelete(req.params.id);
    if (!deletedEmployee) {
      return res.status(404).json({ error: "Employee not found." });
    }
    return res.json({ message: `Employee deleted successfully` });
  } catch (error) {
    console.error("Failed to delete employee:", error);
    return res.status(500).json({ error: "Failed to delete employee. Please try again later." });
  }
};

export {
  AddEmployee,
  getALLEmployees,
  getEmployee,
  updateEmployee,
  deleteEmployee,
};