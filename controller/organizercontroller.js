const db = require('../models');
const Event = db.Event;
const constants = require("../constants/constants");
const event = require('../models/event');
const RESPONSE = constants.RESPONSE;;

const createEvent = async (req, res) => {
    try {
        const { eventName, description, category, eventBanner, dateAndTime, ticketTypes, maxCapacity, pricing } = req.body
        if (!eventName || !category || !dateAndTime || !ticketTypes || !maxCapacity) {
            return res.status(RESPONSE.BAD_REQUEST.statusCode).json({
                name: RESPONSE.BAD_REQUEST.name,
                message: "Please enter required fields"
            });

        }
        const validCategories = Object.values(constants.CATEGORIES);
        if (!validCategories.includes(category)) {
        return res.status(RESPONSE.BAD_REQUEST.statusCode).json({ name: RESPONSE.BAD_REQUEST.name, message: "Invalid Event category!" });
        }

        const validticket= Object.values(constants.TICKET_TYPES);
        if (!validticket.includes(ticketTypes)) {
        return res.status(RESPONSE.BAD_REQUEST.statusCode).json({ name: RESPONSE.BAD_REQUEST.name, message: "Invalid Event ticket type!" });
        }
       
        let newUser = await Event.create({
            event_name: eventName,
            description: description,
            category: category,
            event_banner: eventBanner,
            date_and_time: dateAndTime,
            ticket_types: ticketTypes,
            max_capacity: maxCapacity,
            pricing: pricing
            //scope: constants.SCOPE.MANAGER,->do we need this
        });
       
        if (newUser) {
            return res.status(RESPONSE.CREATED.statusCode).json({ name: RESPONSE.CREATED.name, message: RESPONSE.CREATED.message });
        }
        return res.status(RESPONSE.BAD_REQUEST.statusCode).json({ name: RESPONSE.BAD_REQUEST.name, message: "cannot create user" });


    }
    catch (error) {
        console.log("Error in Creating user ", error);
        return res.status(RESPONSE.INTERNAL_SERVER_ERROR.statusCode).json({ name: RESPONSE.INTERNAL_SERVER_ERROR.name, message: RESPONSE.INTERNAL_SERVER_ERROR.message });
    }
}
const updateEvent = async (req, res) => {
    try{
    const { id } = req.params
    if (!id) {
        return res.status(RESPONSE.BAD_REQUEST.statusCode).json({ name: RESPONSE.BAD_REQUEST.name, message: "Event id not found" })
    }
    const { eventName, description, eventBanner, maxCapacity, pricing } = req.body
    if (!eventName || !eventBanner || !description || !maxCapacity || !pricing) {
        return res.status(RESPONSE.BAD_REQUEST.statusCode).json({ name: RESPONSE.BAD_REQUEST.name, message: "Enter fields to update" })

    }
    const eventDetails = {
        event_name: eventName,
        event_banner: eventBanner,
        description: description,
        max_capacity: maxCapacity,
        pricing: pricing
    }
   
    await db.Event.update(eventDetails, {
        where: { id: id },
         
    });
    return res.status(RESPONSE.CREATED.statusCode).json({ name: RESPONSE.CREATED.name, message: "User updated successfully" });

    }
      catch (error) {
        console.log("Error updating user ", error);
        return res.status(RESPONSE.INTERNAL_SERVER_ERROR.statusCode).json({ name: RESPONSE.INTERNAL_SERVER_ERROR.name, message: RESPONSE.INTERNAL_SERVER_ERROR.message });
    }

}

const cancelEvent= async (req, res) => {
    const {eventId}=req.params

    const event = await db.Event.findByPk(eventId);
    if (!event)   return res.status(RESPONSE.BAD_REQUEST.statusCode).json({ name: RESPONSE.BAD_REQUEST.name, message: "Event id not found" })

    if(event.status=="cancelled"){
        return res.status(RESPONSE.BAD_REQUEST.statusCode).json({ name: RESPONSE.BAD_REQUEST.name, message: "Event already cancelled" })
    }
    event.status = 'cancelled';
    await event.save();
    return res.status(RESPONSE.CREATED.statusCode).json({ name: RESPONSE.CREATED.name, message: "Event cancelled successfully" });
}
module.exports = {
    createEvent,updateEvent,cancelEvent
};




