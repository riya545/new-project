const db = require('../models');
const Event = db.Event;
const constants = require("../constants/constants")
const RESPONSE = constants.RESPONSE;;

const createEvent = async (req, res) => {
    try {
        const { event_name, description, category, event_banner, date_and_time, ticket_types, max_capacity, pricing } = req.body
        if (!event_name || !category || !date_and_time || !ticket_types || !max_capacity) {
            return res.status(RESPONSE.BAD_REQUEST.statusCode).json({
                name: RESPONSE.BAD_REQUEST.name,
                message: "Please enter required fields"
            });

        }
         const validCategories = Object.values(constants.CATEGORIES);
        if (!validCategories.includes(category)) {
        return res.status(RESPONSE.BAD_REQUEST.statusCode).json({ name: RESPONSE.BAD_REQUEST.name, message: "Invalid Event category!" });
        }
       
        let newUser = await Event.create({
            event_name: event_name,
            description: description,
            category: category,
            event_banner: event_banner,
            date_and_time: date_and_time,
            ticket_types: ticket_types,
            max_capacity: max_capacity,
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
module.exports = {
    createEvent
};




