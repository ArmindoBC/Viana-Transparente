'use strict';

module.exports = (sequelize, Sequelize) => {

  const Entidade = sequelize.define('Entidades', {
    nif: Sequelize.TEXT,
    nome: Sequelize.TEXT,
    id: {
      primaryKey: true,
      type: Sequelize.UUID,
      autoIncrement: true
    },
    createdAt:  Sequelize.DATE,
      updatedAt: Sequelize.DATE

  })

  return Entidade;
}
