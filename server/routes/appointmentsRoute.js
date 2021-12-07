const express = require("express");
const router = express.Router();
const appointmentController = require("../controllers/appointmentController");
const permissions = require("../middlewares/permissions");
const tokenVerification = require("../middlewares/tokenVerification");

// .../appointments
router
  .route("/")
  .get(tokenVerification, permissions(["doctor", "admin"]), appointmentController.getAllAppointments)
  .post(tokenVerification, appointmentController.createAppointment);

// .../appointments/:id
router
  .route("/:id")
  .get(tokenVerification, appointmentController.getAppointmentById)
  .put(tokenVerification, appointmentController.updateAppointment);

router
  .route("/:id/status")
  .put(tokenVerification, appointmentController.updateAppointmentStatus);


// Export the router
module.exports = router;
