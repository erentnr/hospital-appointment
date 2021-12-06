const express = require("express");
const router = express.Router();

// import controllers

const userController = require("../controllers/userController");

// .../users
router
    .route("/")
    .get(userController.getAllUsers);

// .../users/:id
router
    .route("/:id")
    .get(userController.getUserById)
    .put(userController.updateUser)
    .delete(userController.deleteUser);

// Export the router
module.exports = router;
