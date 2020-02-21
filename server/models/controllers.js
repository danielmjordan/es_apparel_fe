const query = require('./queries');

const actions = {

  getReviews: async (req, res) => {
    const { productId } = req.params;
    const count = req.query.count ? req.query.count : 5;
    const page = req.query.page ? req.query.page : 0;
    const sort = req.query.sort ? req.query.sort : 'newest';
    const results = await query.getAll(productId, count, page, sort);
    res.status(200).send(results);
  },

  addReview: async (req, res) => {
    const { productId } = req.params;
    res.status(201).send('post route served');
  },

  meta: async (req, res) => {
    const { productId } = req.params;
    const results = await query.meta(productId);
    res.status(200).send(results);
  },

  markHelpful: async (req, res) => {
    const { reviewId } = req.params;
    query.helpful(reviewId);
    res.status(204).send();
  },

  reportReview: async (req, res) => {
    const { reviewId } = req.params;
    query.report(reviewId);
    res.status(204).send();
  },
};

module.exports = actions;
