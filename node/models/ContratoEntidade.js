'use strict';

module.exports = (sequelize, Sequelize) => {

  const ContratoEntidade = sequelize.define('ContratoEntidades', {
    nif: Sequelize.TEXT,
    idContrato: Sequelize.BIGINT,
    id: {
      primaryKey: true,
      type: Sequelize.UUID,
      autoIncrement: true
    },
    createdAt:  Sequelize.DATE,
    updatedAt: Sequelize.DATE

  })

  return ContratoEntidade;
}
