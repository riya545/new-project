'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
 User.init({
  firstName: DataTypes.STRING,
  lastName: DataTypes.STRING,
  email: {
    type: DataTypes.STRING,
    unique: true
  },
  scope: DataTypes.STRING,
  password: DataTypes.STRING,
  phone: {
    type: DataTypes.STRING,
    unique: true
  },
  reset_password_token: {
    type: DataTypes.STRING,
    allowNull: true
  },
  reset_expire_token: {
    type: DataTypes.DATE,
    allowNull: true
  },
  isLoginActivated: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
    allowNull: false  // Since it has a default value
  },
   role: {  
     type: DataTypes.ENUM('USER', 'ORGANIZER', 'ADMIN'),
     allowNull: false,
     defaultValue: 'USER'
   }
}, {
  sequelize,
  modelName: 'User',
});
  return User;
};