const Disease = require("../models/Disease");

exports.getAllDiseases = async (req, res) => {
  try {
    let currentPage = req.query.page || 1;
    let diseasePerPage = 10;

    const diseases = await Disease.find()
      .populate("department")
      .skip(diseasePerPage * (currentPage - 1))
      .limit(diseasePerPage);
      
    res.status(200).json(diseases);
  } catch (err) {
    res.status(500).json({ message: err });
  }
};

exports.createDisease = async (req, res) => {
  if (req.body.name && req.body.department_id) {
    const disease = new Disease({
      name: req.body.name,
      department: req.body.department_id,
    });

    try {
      const savedDisease = await disease.save();
      res.status(201).json(savedDisease);
    } catch (err) {
      res.status(500).json({ message: err });
    }
  } else {
    res.status(400).json({ message: "Invalid request" });
  }
};

exports.getDiseaseById = async (req, res) => {
  if (req.params.id) {
    try {
      const disease = await Disease.findById(req.params.id).populate("department");
      res.status(200).json(disease);
    } catch (err) {
      res.status(500).json({ message: err });
    }
  } else {
    res.status(400).json({ message: "No id provided" });
  }
};

exports.updateDisease = async (req, res) => {
  if (req.params.id) {
    try {
      const disease = await Disease.findByIdAndUpdate(
        req.params.id,
        {
            name: req.body.name,
            department: req.body.department_id,
        },
        { new: true }
      ).populate("department");
      res.status(201).json(disease);
    } catch (err) {
      res.status(500).json({ message: err });
    }
  } else {
    res.status(400).json({ message: "No id found" });
  }
};

exports.deleteDisease = async (req, res) => {
  if (req.params.id) {
    try {
      const existingDisease = await Disease.findById(req.params.id);
      if (existingDisease) {
        await Disease.findByIdAndRemove(req.params.id);
        res.status(200).json({ message: "Disease deleted" });
      } else {
        res.status(404).json({ message: "Disease not found" });
      }
    } catch (error) {
      res.status(500).json({ message: error });
    }
  } else {
    res.status(400).json({ message: "No id provided" });
  }
};
