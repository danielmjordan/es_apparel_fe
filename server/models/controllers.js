const query = require('./queries');

const actions = {

  getReviews: async (req, res) => {
    const { productId } = req.params;
    const results = await query.getAll(productId);
    res.status(200).send(results);
  },

  addReview: async (req, res) => {
    const { productId } = req.params;
    res.status(201).send('post route served');
  },

  meta: async (req, res) => {
    const { productId } = req.params;
    res.status(200).send('Metadata returned from this end point');
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
