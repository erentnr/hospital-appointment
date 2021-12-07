const express = require("express");
const router = express.Router();
const permissions = require("../middlewares/permissions");
const tokenVerification = require("../middlewares/tokenVerification");

// import controllers
const userController = require("../controllers/userController");

// .../users
router
    .route("/")
    .get(tokenVerification, permissions(["admin"]), userController.getAllUsers);

// .../users/:id
router
    .route("/:id")
    .get(tokenVerification, userController.getUserById)
    .put(tokenVerification, permissions(["admin"]), userController.updateUser)
    .delete(tokenVerification, permissions(["admin"]), userController.deleteUser);

// Export the router
module.exports = router;
