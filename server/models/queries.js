const db = require('./db.js');

const queries = {

  getAll: async (id, count = 5, page = 0) => {
    try {
      const [results] = await db.query(`SELECT * FROM reviews
      LEFT JOIN photos on reviews .id = photos.review_id
      WHERE product_id = ${id} ORDER BY DATE DESC LIMIT ${count}`);

      const res = results.map((row) => (
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
          photos: [],
        }
      ));

      const photos = results.map((row) => {
        return row.photo_id ? row.photos = { id: row.photo_id, review_id: row.review_id, url: row.url } : null;
      });

      photos.forEach((photo) => {
        if (photo) {
          res.forEach((record) => {
            if (record.review_id === photo.review_id) {
              record.photos.push(photo);
            }
          });
        }
      });

      const response = {
        product: id,
        page,
        count,
        results: res,
      };
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
