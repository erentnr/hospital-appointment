const express = require("express");
const router = express.Router();
const appointmentController = require("../controllers/appointmentController");

// .../appointments
router
  .route("/")
  .get(appointmentController.getAllAppointments)
  .post(appointmentController.createAppointment);

// .../appointments/:id
router
  .route("/:id")
  .get(appointmentController.getAppointmentById)
  .put(appointmentController.updateAppointment);

router
  .route("/:id/status")
  .put(appointmentController.updateAppointmentStatus);


// Export the router
module.exports = router;
