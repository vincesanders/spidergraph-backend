const knex = require('knex');
const config = require('../knexfile');
const env = process.env.DB_ENV;
const db = env === 'test' ? config.test : env === 'development' ? config.development : config.production;

module.exports = knex(db)