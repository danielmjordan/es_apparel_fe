require('dotenv').config();
const Sequelize = require('sequelize');

const db = new Sequelize(
  process.env.DATABASE,
  process.env.DATABASE_USER,
  process.env.DATABASE_PASSWORD,
  {
    dialect: 'postgres',
  },
);

try {
  db.authenticate()
    .then(() => console.log('PostgreSQL up and running'));
} catch (err) {
  return err;
}

module.exports = db;
