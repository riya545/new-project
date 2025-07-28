const express = require("express");
const { createEvent,updateEvent,cancelEvent} = require("../controller/organizercontroller");
const { authenticateToken }=require("../middlewares/auth")
const { authorizeRoles }=require("../middlewares/roleBasedAuth")
const {scope}=require("../constants/constants")
//const { verifyToken,authenticateScope} = require("../middleware/auth");
const router = express.Router();

router.post("/organize/create", authenticateToken, authorizeRoles(scope.ORGANIZATION), createEvent);
router.put("/organize/event/:id",authenticateToken,authorizeRoles(scope.ORGANIZATION,scope.ADMIN),updateEvent)
router.post("/organize/event/:eventId",authenticateToken,authorizeRoles(scope.ORGANIZATION,scope.ADMIN),cancelEvent)

module.exports = router;
