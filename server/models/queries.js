const sequelize = require('./db.js');

const getByDate = async () => {
  try {
    const results = await sequelize.query('SELECT * FROM reviews WHERE product_id = 5 ORDER BY DATE DESC LIMIT 2');
    return results;
  } catch (err) {
    return err;
  }
};

const helpful = async (review_id) => {
  try {
    sequelize.query(`UPDATE reviews SET helpfulness = helpfulness + 1 WHERE id =${review_id}`);
  } catch (err) {
    return err;
  }
};

module.exports = {
  getByDate,
  helpful,
};
