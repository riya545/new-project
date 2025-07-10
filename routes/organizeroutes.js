const express = require("express");
const { createEvent } = require("../controller/organizercontroller");
//const { verifyToken,authenticateScope} = require("../middleware/auth");
const router = express.Router();

router.post("/organize/create",createEvent)

module.exports = router;
