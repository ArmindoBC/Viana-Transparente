'use strict';

module.exports = (sequelize, Sequelize) => {

  const Contrato = sequelize.define('Contratos', {
    id: {
      type: Sequelize.BIGINT,
      primaryKey: true,
      autoIncrement: true
    },
    tipoContrato: Sequelize.TEXT,
    tipoProcedimento: Sequelize.TEXT,
    objectoContrato: Sequelize.TEXT,
    adjudicante: Sequelize.TEXT,
    adjudicatario: Sequelize.TEXT,
    dataPublicacao: Sequelize.DATE,
    dataCelebracaoContrato: Sequelize.DATE,
    precoContratual: Sequelize.FLOAT,
    precoEfectivo: Sequelize.FLOAT,
    cpv: Sequelize.TEXT,
    prazoExecucao: Sequelize.TEXT,
    localExecucao: Sequelize.TEXT,
    criterioMaterial: Sequelize.TEXT,
    ficheiros: Sequelize.TEXT,
    categoria: Sequelize.BIGINT

  })

  return Contrato;
}
