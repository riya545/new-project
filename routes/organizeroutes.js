const express = require("express");
const { createEvent,updateEvent,cancelEvent} = require("../controller/organizercontroller");
//const { verifyToken,authenticateScope} = require("../middleware/auth");
const router = express.Router();

router.post("/organize/create",createEvent)
router.put("/organize/event/:id",updateEvent)
router.post("/organize/event/:eventId",cancelEvent)

module.exports = router;
