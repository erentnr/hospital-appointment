const express = require("express");
const router = express.Router();

// .../appointments
router.route("/").get(/* Get All Appointment */).post(/* Create Appointment */);

// .../appointments/:id
router
  .route("/:id")
  .get(/* Get Appointment by ID */)
  .put(/* Update Appointment by ID */)
  .delete(/* Delete Appointment by ID */);

// Export the router
module.exports = router;
