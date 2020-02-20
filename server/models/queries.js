const db = require('./db.js');

const queries = {

  getAll: async (id, count = 5, page = 0) => {
    try {
      const [results, meta] = await db.query(`SELECT * FROM reviews
      LEFT JOIN photos on reviews .id = photos.review_id
      WHERE product_id = ${id} ORDER BY DATE DESC LIMIT ${count}`);

      // console.log(meta.rows[0]);
      const res = meta.rows.map((row) => (
        {
          review_id: row.id,
          rating: row.rating,
          summary: row.summary,
          recommend: row.recommend,
          response: row.response,
          body: row.body,
          date: row.date,
          reviewer_name: row.reviewer_name,
          reviewer_email: row.reviewer_email,
          helpfulness: row.helpfulness,
          photos: row.url,
        }
      ));
      const response = {
        product: id,
        page,
        count,
        results: res,
      };
      console.log(response);
      return response;
    } catch (err) {
      return err;
    }
  },

  // addReview: async (id) => {
  //   try {
  //     const results = await db.query(`INSERT into`)
  //     return results;
  //   } catch (err) {
  //     return err;
  //   }
  // },

  helpful: async (id) => {
    try {
      const results = await db.query(`UPDATE reviews SET helpfulness = helpfulness + 1 WHERE id =${id}`);
      return results;
    } catch (err) {
      return err;
    }
  },

  report: async (id) => {
    try {
      const results = await db.query(`UPDATE reviews SET reported = true WHERE id = ${id}`);
      return results;
    } catch (err) {
      return err;
    }
  },
};

module.exports = queries;
