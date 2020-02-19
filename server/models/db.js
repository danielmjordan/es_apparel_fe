require('dotenv').config();
const Sequelize = require('sequelize');

const sequelize = new Sequelize(
  process.env.DATABASE,
  process.env.DATABASE_USER,
  process.env.DATABASE_PASSWORD,
  {
    dialect: 'postgres',
  },
);

try {
  sequelize.authenticate()
    .then(() => console.log('PostgreSQL up and running'));
} catch (err) {
  return err;
}

const getByDate = async () => {
  try {
    const [results, metadata] = await sequelize.query('SELECT * FROM reviews WHERE product_id = 5 ORDER BY DATE DESC LIMIT 2');
    console.log(results, metadata);
    return [results, metadata];
  } catch (err) {
    return err;
  }
};

getByDate();

module.exports = sequelize;
