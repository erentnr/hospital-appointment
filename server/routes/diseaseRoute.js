const express = require("express");
const router = express.Router();
const diseaseController = require("../controllers/diseaseController");

// .../departments
router
  .route("/")
  .get(diseaseController.getAllDiseases)
  .post(diseaseController.createDisease);

// .../departments/:id
router
  .route("/:id")
  .get(diseaseController.getDiseaseById)
  .put(diseaseController.updateDisease)
  .delete(diseaseController.deleteDisease);

// Export the router
module.exports = router;
