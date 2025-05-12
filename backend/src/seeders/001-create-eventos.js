module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('eventos', [
      {
        nombre: 'Torneo de Magic',
        ubicacion: 'Madrid',
        fecha: '2025-06-10',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        nombre: 'Torneo de Ajedrez',
        ubicacion: 'Barcelona',
        fecha: '2025-07-15',
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('eventos', null, {});
  }
};
