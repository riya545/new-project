const dotenv = require('dotenv').config();
const express = require("express");
const router = require("./routes/authroutes");
const bodyParser = require('body-parser')

//import { connection } from "./postgrsql.js"
const app= express();
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
const PORT=2000;

//connection();
app.use('/api', router);
app.listen(PORT,()=>{
  console.log(`server is running at ${PORT}`)
})