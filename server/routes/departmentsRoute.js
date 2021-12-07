const express = require("express");
const router = express.Router();
const departmentsController = require("../controllers/departmentController");
const permissions = require("../middlewares/permissions");
const tokenVerification = require("../middlewares/tokenVerification");

// .../departments
router
  .route("/")
  .get(tokenVerification, departmentsController.getAllDepartments)
  .post(tokenVerification, permissions(["admin"]), departmentsController.createDepartment);

// .../departments/:id
router
  .route("/:id")
  .get(tokenVerification, departmentsController.getDepartmentById)
  .put(tokenVerification, permissions(["admin"]), departmentsController.updateDepartment)
  .delete(tokenVerification, permissions(["admin"]), departmentsController.deleteDepartment);

// Export the router
module.exports = router;
