const express = require("express");
const router = express.Router();

// import controllers

const userController = require("../controllers/userController");

// .../users
router
    .route("/")
    .get(userController.getAllUser);

// .../users/:id
router
.route("/:id")
    .get(userController.getUserDetail)
    .delete(userController.deleteUser)
    .put(userController.updateUser);

// Export the router
module.exports = router;
