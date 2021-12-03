const express = require('express');
const router = express.Router();

// .../auth/register
router.route("/register")
    .post( /* Create A New Account */);

// .../auth/login
router.route("/login")
    .post( /* Login To An Account */);

// .../auth/logout
router.route("/logout")
    .post( /* Logout To An Account */);


// Export the router
module.exports = router;
