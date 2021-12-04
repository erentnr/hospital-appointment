const express = require("express");
const router = express.Router();

// .../users
router.route("/").get(/* Get All Users */).post(/* Create User */);

// .../users/:id
router
  .route("/:id")
  .get(/* Get User by ID */)
  .put(/* Update User by ID */)
  .delete(/* Delete User by ID */);

// Export the router
module.exports = router;
