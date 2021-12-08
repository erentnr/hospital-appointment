const express = require("express");
const router = express.Router();
const diseaseController = require("../controllers/diseaseController");
const permissions = require("../middlewares/permissions");
const tokenVerification = require("../middlewares/tokenVerification");

// .../disease
router
  .route("/")
  .get(tokenVerification, diseaseController.getAllDiseases)
  .post(tokenVerification, permissions(["admin"]), diseaseController.createDisease);

// .../disease/:id
router
  .route("/:id")
  .get(tokenVerification, diseaseController.getDiseaseById)
  .put(tokenVerification, permissions(["admin"]), diseaseController.updateDisease)
  .delete(tokenVerification, permissions(["admin"]), diseaseController.deleteDisease);

// Export the router
module.exports = router;
