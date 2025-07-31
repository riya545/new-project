const express = require("express");
const { browseEvents } = require("../controller/usercontroller");
const { authenticateToken }=require("../middlewares/auth")
const { authorizeRoles }=require("../middlewares/roleBasedAuth")
const {scope}=require("../constants/constants")
//const { verifyToken,authenticateScope} = require("../middleware/auth");
const router = express.Router();

router.post("/user/events", authenticateToken, authorizeRoles(scope.USER), browseEvents);

