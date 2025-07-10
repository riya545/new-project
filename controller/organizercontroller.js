const {constants} = require("../constants/constants")
const { Event }=require("../models/event")

const createEvent=async(req,res)=>{
    const{event_name,description,category,event_banner,date_and_time,ticket_types,max_capacity,pricing}=req.body
    

}