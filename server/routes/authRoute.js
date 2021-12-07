const express = require("express");
const authController = require('../controllers/authController');
const tokenVerification = require("../middlewares/tokenVerification");
const checkLogin = require("../middlewares/checkLogin");

const router = express.Router();

// .../auth/register
router.route("/register").post(checkLogin, authController.createUser);

// .../auth/login
router.route("/login").post(checkLogin, authController.login);

// .../auth/logout
router.route("/logout").delete(tokenVerification, authController.logout);

// .../auth/token
router.route("/token").post(checkLogin, authController.token);

// Export the router
module.exports = router;
