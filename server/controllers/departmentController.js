const Department = require("../models/Department");

exports.getAllDepartments = async (req, res) => {
  try {
    const departments = await Department.find();
    res.status(200).json(departments);
  } catch (err) {
    res.status(500).json({ message: err });
  }
};

exports.createDepartment = async (req, res) => {
  if (req.body.name) {
    const department = new Department({
      name: req.body.name,
    });

    try {
      const savedDepartment = await department.save();
      res.status(201).json(savedDepartment);
    } catch (err) {
      res.status(500).json({ message: err });
    }
  } else {
    res.status(400).json({ message: "Invalid request" });
  }
};

exports.getDepartmentById = async (req, res) => {
  if (req.params.id) {
    try {
      const department = await Department.findById(req.params.id);
      res.status(200).json(department);
    } catch (err) {
      res.status(500).json({ message: err });
    }
  } else {
    res.status(400).json({ message: "No id provided" });
  }
};

exports.updateDepartment = async (req, res) => {
  if (req.params.id) {
    try {
      const department = await Department.findByIdAndUpdate(
        req.params.id,
        {
          name: req.body.name,
        },
        { new: true }
      );
      res.status(201).json(department);
    } catch (err) {
      res.status(500).json({ message: err });
    }
  } else {
    res.status(400).json({ message: "No id found" });
  }
};

exports.deleteDepartment = async (req, res) => {
  if (req.params.id) {
    try {
      const existingDepartment = await Department.findById(req.params.id);
      if (existingDepartment) {
        await Department.findByIdAndRemove(req.params.id);
        res.status(200).json({ message: "Department deleted" });
      } else {
        res.status(404).json({ message: "Department not found" });
      }
    } catch (error) {
      res.status(500).json({ message: error });
    }
  } else {
    res.status(400).json({ message: "No id provided" });
  }
};
