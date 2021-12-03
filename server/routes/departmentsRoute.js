const express = require("express");
const router = express.Router();
const departmentsController = require("../controllers/departmentController");

// .../departments
router
  .route("/")
  .get(departmentsController.getAllDepartments)
  .post(departmentsController.createDepartment);

// .../departments/:id
router
  .route("/:id")
  .get(departmentsController.getDepartmentById)
  .put(departmentsController.updateDepartment)
  .delete(departmentsController.deleteDepartment);

// Export the router
module.exports = router;
