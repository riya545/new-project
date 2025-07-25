//const { v4: uuidv4 } = require('uuid');
const bcrypt = require("bcrypt");
const { User } = require('../models');
const jwt = require("jsonwebtoken")
const constants = require("../constants/constants")
const RESPONSE = constants.RESPONSE;
const sendMail = require("../services/mail.service")
const { Op } = require('sequelize');
//const  AccessToken=require( '../models/index.js');
const secret_key = process.env.SECRET_KEY;
//import { where } from 'sequelize';


const register = async (req, res) => {
    try {
        const { firstName, lastName, email, password } = req.body;
        const hashedPassword = await bcrypt.hash(password, 10);
        const existing_email = await User.findOne({ where: { email } });
        //console.log(existing_email)
        if (existing_email) {
            return res.status(RESPONSE.BAD_REQUEST.statusCode).json({
                name: RESPONSE.BAD_REQUEST.name,
                message: "email already exists"
            });
        }
        // Create a new user in the database
        const newUser = await User.create({
            firstName,
            lastName,
            email,
            password: hashedPassword,
            role: constants.scope.ORGANIZATION
        });
        console.log(newUser)

        return res.status(RESPONSE.SUCCESS.statusCode).json({
            name: RESPONSE.SUCCESS.name,
            message: "Register successfull"
        });
        //res.status(200).json({ message: 'Login successful', savedToken,updateToken});

    } catch (error) {
        console.log(error)
        return res.status(RESPONSE.INTERNAL_SERVER_ERROR.statusCode).json({ name: RESPONSE.INTERNAL_SERVER_ERROR.name, message: RESPONSE.INTERNAL_SERVER_ERROR.message });


    }
}
const login = async (req, res) => {
    try {
        const { email, password } = req.body
        const loginuser = await User.findOne({ where: { email } });
        if (!loginuser) {
            return res.status(RESPONSE.BAD_REQUEST.statusCode).json({
                name: RESPONSE.BAD_REQUEST.name,
            });
        }
        // console.log("Scope in JWT:", loginuser.scope); 
        const isMatch = await bcrypt.compare(password, loginuser.password);
        if (!isMatch) {return res.status(RESPONSE.BAD_REQUEST.statusCode).json({
            name: RESPONSE.BAD_REQUEST.name,
            message: "Password doesnt match",
        });}
         else{
        const token = jwt.sign(
          {
            userId: loginuser._id,
            name: loginuser.firstName,
            role: loginuser.role,
          },
          secret_key,
          { expiresIn: constants.TOKENEXPIRE.duration }
        );
        console.log("role of user while login",loginuser.role)
        res.status(200).json({ message: 'Login successful',token :token  });
    }
        //   console.log("JWT_SECRET:", process.env.JWT_SECRET);
        //   const token = jwt.sign({ id: loginuser.id, email: loginuser.email,scope:loginuser.scope }, process.env.JWT_SECRET, {
        //       expiresIn: '15m'
        //     });


        //   const refreshToken= jwt.sign({ id: loginuser.id, email: loginuser.email,scope:loginuser.scope }, process.env.JWT_SECRET, {
        //       expiresIn: '7d'
        //     });

        //     // const AccessToken = db.AccessToken
        //     console.log("token",token)
        //     // return token

        //   const savedToken= await db.AccessToken.create({ token, userId: loginuser.id });
        //   const updateToken=await db.RefreshToken.create({ refreshToken, userId: loginuser.id });
        //   // Save refresh token in DB

        // res.status(200).json({ message: 'Login successful' });
    }
    catch (error) {
              console.log(error)
        return res.status(RESPONSE.INTERNAL_SERVER_ERROR.statusCode).json({ name: RESPONSE.INTERNAL_SERVER_ERROR.name, message: RESPONSE.INTERNAL_SERVER_ERROR.message });


    }
}
const forgetPassword = async (req, res) => {
    try {
        console.log("api hit")
        const { email } = req.body

        const existingEmail = await User.findOne({ where: { email } });
        //  console.log(existingEmail)
        if (!existingEmail) {
            return res.status(RESPONSE.BAD_REQUEST.statusCode).json({
                name: RESPONSE.BAD_REQUEST.name,
                message: "Invalid email",
            });
        }
        const secret = process.env.SECRET_KEY || ''
        const token = jwt.sign({ id: existingEmail.id }, secret)
        const url = `${process.env.RESET_PASSWORD_URL}?token=${token}`
        const message = `click link below : \n${url}`
        await User.update(
            {
                reset_password_token: token,//set reset password in db
                reset_expire_token: Date.now() + 15 * 60 * 1000
            },
            {
                where: { id: existingEmail.id }
            }

        );
        sendMail(email, message)
        return res.status(RESPONSE.SUCCESS.statusCode).json({ name: RESPONSE.SUCCESS.name, message: "Email sent successfully" });

    }
    catch (error) {
        console.log(error)
        return res.status(RESPONSE.INTERNAL_SERVER_ERROR.statusCode).json({ name: RESPONSE.INTERNAL_SERVER_ERROR.name, message: RESPONSE.INTERNAL_SERVER_ERROR.message });
    }

}
const resetPassword = async (req, res) => {//edit pending
    const { token } = req.body
    if (!token) {
        return res.status(RESPONSE.BAD_REQUEST.statusCode).json({ name: RESPONSE.BAD_REQUEST.name, message: RESPONSE.INTERNAL_SERVER_ERROR.message });
    }
    const existingUser = await User.findOne({ where: { reset_password_token: token } })
    if (!existingUser) {
        return res.status(RESPONSE.NOT_FOUND.statusCode).json({ name: RESPONSE.NOT_FOUND.name, message: RESPONSE.NOT_FOUND.message })
    }
    const validUser = await User.findOne({ where: { reset_expire_token: { [Op.gte]: Date.now() } } })
    if (!validUser)
        return res.status(RESPONSE.BAD_REQUEST.statusCode).json({ name: RESPONSE.BAD_REQUEST.name, message: "not a valid user" })
    let { password, confirm_password } = req.body
    if (confirm_password !== password)
        return res.status(RESPONSE.BAD_REQUEST.statusCode).json({ name: RESPONSE.BAD_REQUEST.name, message: "password doesnt match" })
    password = await bcrypt.hash(password, 10)
    await User.update(
        { password: password, isLoginActivated: true },
        { where: { id: existingUser.id } }
    )
    return res.status(RESPONSE.SUCCESS.statusCode).json({ name: RESPONSE.SUCCESS.name, message: "Password changed" })

}
module.exports = {
    register, login, forgetPassword, resetPassword
};

