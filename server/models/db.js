require('dotenv').config();
const Sequelize = require('sequelize');

const sequelize = new Sequelize(
  process.env.DATABASE,
  process.env.DATABASE_USER,
  process.env.DATABASE_PASSWORD,
  {
    port: process.env.PORT,
    dialect: 'postgres',
  },
);

console.log(process.env.DATABASE)

try {
  sequelize.authenticate()
    .then(() => console.log('DB up and running'));
} catch (err) {
  return err;
}

// const models = {
//   Review: sequelize.import('./review'),
//   Photo: sequelize.import('./photo'),
//   Characteristic: sequelize.import('./characteristic'),
//   Characteristic_Review: sequelize.import('characteristic_review'),
// };

// Object.key(models).forEach((key) => {
//   if ('associate' in models[key]) {
//     models[key].associate(models);
//   }
// });

// module.exports.models = models;
module.exports.sequelize = sequelize;
