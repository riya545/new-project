const db=require("../models")
const User=db.User
const constants=require("../constants/constants")
const RESPONSE = constants.RESPONSE;
const { Op } = require('sequelize');

const browseEvents =async (req,res)=>{//pagination needed
  try {
    let query = {}; // dynamic where clause
    let order = [['date_and_time', 'ASC']];

    // Get query parameters
    const { name, category, ticketType, status } = req.query;

    // Build dynamic query
    if (name) {
      query['event_name'] = { [Op.iLike]: `%${name.toLowerCase()}%` };
    }

    if (category) {
      query['category'] = category;
    }

    if (ticketType) {
      query['ticket_types'] = { [Op.contains]: [ticketType] }; // assuming JSONB array
    }

    if (status) {
      query['status'] = status;
    }

    // Fetch events with organizer details
    const events = await db['Event'].findAll({
      attributes: ['id', 'event_name', 'description', 'category', 'date_and_time', 'status', 'pricing'],
      include: [
        {
          model: db['User'],
          as: 'organizer',
          attributes: ['id', 'firstName', 'lastName', 'email'],
          required: false
        }
      ],
      where: query,
      order: order,
      distinct: true
    });

    // Return response
    return res.status(200).json({ data: events });

  } catch (error) {
    console.log("Error in browseEvents =====>>>", error);
    return res.status(500).json({
      message: "Internal server error while fetching events"
    });
  }
};

module.exports={
    browseEvents
}
