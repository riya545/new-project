'use strict';

/** @type {import('sequelize-cli').Migration} */

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('Users', 'reset_password_token', {
      type: Sequelize.STRING,
      allowNull: true
    });
    await queryInterface.addColumn('Users', 'reset_expire_token', {
      type: Sequelize.DATE,
      allowNull: true
    });
    await queryInterface.addColumn('Users', 'isLoginActivated', {
      type: Sequelize.BOOLEAN,
      defaultValue: false
    });
  },

  down: async (queryInterface) => {
    await queryInterface.removeColumn('Users', 'reset_password_token');
    await queryInterface.removeColumn('Users', 'reset_expire_token');
    await queryInterface.removeColumn('Users', 'isLoginActivated');
  
}
};

