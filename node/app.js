'use strict';

const Sequelize = require('sequelize');
const mainLoader = require('./controllers/mainLoader.js');
const cpvLoad = require('./controllers/cpvLoad.js');


var config = {
  appRoot: __dirname // required config
};

/* Connect to database */

const sequelize = new Sequelize('postgres', 'postgres', '3Lt23pX3', {
  host: 'rest-api.cak0vdkaiapw.eu-west-3.rds.amazonaws.com',
  dialect: 'postgres',
  pool: {
    max: 30,
    min: 0,
    acquire: 30000,
    idle: 10000,
    handleDisconnects: true
  },
});

const Entidade = require('./models/Entidade.js')(sequelize, Sequelize);
const Contrato = require('./models/Contrato.js')(sequelize, Sequelize);
const ContratoEntidade = require('./models/ContratoEntidade.js')(sequelize, Sequelize);
const CPVs = require('./models/CPVs.js')(sequelize, Sequelize);



sequelize
  .authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  });


console.log("Begin the loading...");

//cpvLoad(CPVs);
mainLoader(Entidade, Contrato, ContratoEntidade, CPVs);
