/* eslint-disable no-plusplus */
/* eslint-disable no-unused-expressions */
const db = require('./db.js');

const queries = {

  getReviews: async (id, count, page, sort) => {
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

  postReview: async (id, reviewBody) => {
    const {
      rating, summary, body, recommend, name, email, photos, characteristics,
    } = reviewBody;
    try {
      const reviewId = await db.query(`INSERT INTO REVIEWS (product_id, rating, summary, body, recommend, reviewer_name, reviewer_email)
      VALUES (${id}, ${rating}, '${summary}', '${body}', ${recommend}, '${name}', '${email}') RETURNING id as review_id`);

      const currentReviewId = reviewId[0][0].review_id;

      Object.keys(characteristics).forEach((key) => {
        const charId = key;
        const val = characteristics[key];

        db.query(`INSERT INTO char_reviews (characteristic_id, review_id, value) VALUES (${charId}, ${currentReviewId}, ${val})`);
      });

      if (photos) {
        await photos.forEach((photo) => {
          db.query(`INSERT INTO PHOTOS (review_id, url) VALUES (${currentReviewId}, '${photo}')`);
        });
      }

      return currentReviewId;
    } catch (err) {
      return err;
    }
  },

  meta: async (id) => {
    try {
      const [reviewData] = await db.query(`SELECT rating, recommend FROM REVIEWS WHERE product_id = ${id}`);
      const [charsData] = await db.query(`SELECT name, characteristic_id as id, AVG(value) FROM characteristics
      LEFT JOIN char_reviews ON characteristics .id = characteristic_id
      WHERE product_id = ${id} GROUP BY characteristic_id, name ORDER BY id`);

      const results = {
        product_id: id,
        ratings: {},
        recommended: {},
        characteristics: {},
      };

      reviewData.forEach((row) => {
        const { ratings, recommended } = results;
        !ratings[row.rating] ? ratings[row.rating] = 1 : ratings[row.rating]++;
        !recommended[row.recommend] ? recommended[row.recommend] = 1 : recommended[row.recommend]++;
      });

      charsData.forEach((row) => {
        const { characteristics } = results;
        if (!characteristics[row.name]) {
          characteristics[row.name] = {
            id: row.id,
            value: Number(row.avg).toFixed(4),
          };
        }
      });

      return results;
    } catch (err) {
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
