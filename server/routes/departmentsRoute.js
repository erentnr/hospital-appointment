const express = require('express');
const router = express.Router();

// .../departments
router.route("/")
    .get( /* Get All Departments */)
    .post( /* Create Departments */);

// .../departments/:id
router.route("/:id")
    .get( /* Get Departments by ID */)
    .put( /* Update Departments by ID */)
    .delete( /* Delete Departments by ID */);


// Export the router
module.exports = router;
