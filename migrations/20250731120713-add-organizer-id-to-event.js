'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
     await queryInterface.addColumn('Events', 'organizer_id', {
      type: Sequelize.INTEGER,
      allowNull: true,
      references: {
        model: 'Users', // name of the target table (must match DB table, not model file)
        key: 'id',       // referenced column in Users table
      },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE',
    });
    console.log('Finished adding organizer_id column');
    
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
     // Remove organizer_id column from Events table
    await queryInterface.removeColumn('Events', 'organizer_id');
  }
};
