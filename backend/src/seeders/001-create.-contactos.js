'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('contactos', [
      {
        nombre: 'Juan Pérez',
        telefono: '123-456-7890',
        email: 'juan.perez@example.com',
        direccion: 'Calle Falsa 123',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        nombre: 'Ana Gómez',
        telefono: '987-654-3210',
        email: 'ana.gomez@example.com',
        direccion: 'Avenida Siempre Viva 742',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        nombre: 'Carlos López',
        telefono: '456-789-0123',
        email: 'carlos.lopez@example.com',
        direccion: 'Calle de la Paz 456',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('contactos', null, {});
  },
};
