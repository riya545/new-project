module.exports={
    scope:{
        ADMIN: "ADMIN",
        ORGANIZATION: "ORGANIZER",
        USER: "USER"
    },
    RESPONSE: {
        SUCCESS: {
            statusCode: 200,
            name: "Success",
            message: "Success",
            updateMessage: "Updated Successfully.",
            deleteMessage: "Deleted Successfully."
        },
        CREATED: {
            statusCode: 201,
            name: "Created",
            message: "Created Successfully.",
        },
        BAD_REQUEST: {
            statusCode: 400,
            name: "BadRequest",
            message: "Bad request",
            requiredFieldmessage: "Please fill the required fields."
        },
        NOT_FOUND: {
            statusCode: 404,
            name: "NotFound",
            message: "Not found",
        },
        INTERNAL_SERVER_ERROR: {
            statusCode: 500,
            name: "InternalServerError",
            message: "Something went wrong, please try again later.",
        },
        UNAUTHORIZED: {
            statusCode: 401,
            name: "Unauthorized",
            message: "Unauthorized access",
        },
        FORBIDDEN: {
            statusCode: 403,
            name: "Forbidden",
            message: "Access denied",
        },
        CONFLICT: {
            statusCode: 409,
            name: "Conflict",
            message: "Already exists",
        },
      
    },
      CATEGORIES : {
            MUSIC: 'Music',
            TECH: 'Tech',
            SPORTS: 'Sports',
            ART: 'Art',
            BUSINESS: 'Business',
            WORKSHOP: 'Workshop',
            CONFERENCE: 'Conference',
        },

        TICKET_TYPES :{
            GENERAL: 'General',
            VIP: 'VIP',
            EARLY_BIRD: 'Early Bird',
        },



TOKENEXPIRE:{
    duration:"1h"
}
}