//const { v4: uuidv4 } = require('uuid');
const bcrypt = require("bcrypt");
const db = require("../models");
const user = require("../models/user");
const jwt = require("jsonwebtoken")
const RESPONSE = constants.RESPONSE;
const constants = require("../constants/constants.js")
const { Op } = require('sequelize');
//const  AccessToken=require( '../models/index.js');

//import { where } from 'sequelize';

const User = db.User;
const register = async (req, res) => {
    try {
        const { firstName, lastName, email, password } = req.body;
        const hashedPassword = await bcrypt.hash(password, 10);
        const existing_email = await User.findOne({ where: { email } });
        //console.log(existing_email)
        if (existing_email) {
            return res.status(RESPONSE.BAD_REQUEST.statusCode).json({
                name: RESPONSE.BAD_REQUEST.name,
            });
        }
        // Create a new user in the database
        const newUser = await User.create({
            firstName,
            lastName,
            email,
            password: hashedPassword,
            scope: constants.scope.CUSTOMER
        });
        console.log(newUser)

        res.status(201).json({ message: 'User registered successfully' });
        //res.status(200).json({ message: 'Login successful', savedToken,updateToken});

    } catch (error) {

        return res.status(RESPONSE.INTERNAL_SERVER_ERROR.statusCode).json({ name: RESPONSE.INTERNAL_SERVER_ERROR.name, message: RESPONSE.INTERNAL_SERVER_ERROR.message });


    }
}
const login = async (req, res) => {
    try {
        const { email, password } = req.body
        const loginuser = await User.findOne({ where: { email } });
        if (!loginuser) {
            res.status(404).json({ message: 'User not found' })
        }
        // console.log("Scope in JWT:", loginuser.scope); 
        const isMatch = await bcrypt.compare(password, loginuser.password);
        if (!isMatch) return res.status(401).json({ message: 'Invalid password' });
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

        //   res.status(200).json({ message: 'Login successful', savedToken,updateToken});
    }
    catch (error) {

        return res.status(RESPONSE.INTERNAL_SERVER_ERROR.statusCode).json({ name: RESPONSE.INTERNAL_SERVER_ERROR.name, message: RESPONSE.INTERNAL_SERVER_ERROR.message });


    }
    module.exports = {
        register, login
    };

}