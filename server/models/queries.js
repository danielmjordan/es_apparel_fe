const sequelize = require('./db.js');

const getByDate = async (id, count = 5) => {
  try {
    const results = await sequelize.query(`SELECT * FROM reviews WHERE product_id = ${id} ORDER BY DATE DESC LIMIT ${count}`);
    return results;
  } catch (err) {
    return err;
  }
};

const helpful = async (id) => {
  try {
    sequelize.query(`UPDATE reviews SET helpfulness = helpfulness + 1 WHERE id =${id}`);
  } catch (err) {
    return err;
  }
};

const report = async (id) => {
  try {
    const results = await sequelize.query(`UPDATE reviews SET reported = true WHERE id = ${id}`);
    return results;
  } catch (err) {
    return err;
  }
};

module.exports = {
  getByDate,
  helpful,
  report,
};
