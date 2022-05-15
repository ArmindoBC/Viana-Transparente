'use strict';

module.exports = (sequelize, Sequelize) => {

  const CPVs = sequelize.define('CPVs', {
    cpv: Sequelize.TEXT,
    identificador: Sequelize.BIGINT,
    id: {
      primaryKey: true,
      type: Sequelize.UUID,
      autoIncrement: true
    },
    createdAt:  Sequelize.DATE,
    updatedAt: Sequelize.DATE

  })

  return CPVs;
}
