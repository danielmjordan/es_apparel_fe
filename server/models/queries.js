const db = require('./db.js');

const queries = {

  getAll: async (id, count, page, sort) => {
    const sortOptions = {
      newest: 'DATE',
      helpful: 'HELPFULNESS',
      relevance: 'HELPFULNESS DESC, DATE ',
    };

    try {
      const [results] = await db.query(`SELECT * FROM reviews
      LEFT JOIN photos on reviews .id = photos.review_id
      WHERE product_id = ${id} ORDER BY ${sortOptions[sort]} DESC LIMIT ${count}`);

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

      const photos = results.map((row) => (
        row.photo_id ? { id: row.photo_id, url: row.url, review_id: row.review_id } : null
      ));

      photos.forEach((photo) => {
        if (photo) {
          res.forEach((record) => {
            if (record.review_id === photo.review_id) {
              delete photo.review_id;
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

  meta: async (id) => {
    try {
      const [reviewData] = await db.query(`SELECT rating, recommend FROM REVIEWS WHERE product_id = ${id}`);
      const results = {
        product_id: id,
        ratings: {},
        recommended: {},
        characteristics: {},
      };

      reviewData.forEach(row => {
        console.log(row);
      })

      return results;
    } catch(err) {
      return err;
    }
  },

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
