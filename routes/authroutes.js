const express = require("express");
const { register, login, forgetPassword,resetPassword} = require("../controller/authcontroller");
//const { verifyToken,authenticateScope} = require("../middleware/auth");
const router = express.Router();
router.post("/register", register);
router.post("/login", login);
router.post("/forgetPassword",forgetPassword);
router.post("/resetupdate",resetPassword)

module.exports = router;
