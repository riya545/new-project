'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Event extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Event.init({
    event_name: DataTypes.STRING,
    description: DataTypes.STRING,
    category: DataTypes.STRING,
    event_banner: DataTypes.STRING,
    date_and_time: DataTypes.DATE,
    ticket_types: DataTypes.JSONB,
    max_capacity: DataTypes.INTEGER,
    status: {
      type: DataTypes.ENUM('active', 'cancelled', 'completed'),
      defaultValue: 'active',
    },
    pricing: DataTypes.FLOAT
  }, {
    sequelize,
    modelName: 'Event',
  });
  return Event;
};