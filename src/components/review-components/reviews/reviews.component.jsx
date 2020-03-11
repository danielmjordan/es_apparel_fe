/* eslint-disable no-restricted-globals */
/* eslint-disable consistent-return */
import React from 'react';
import propTypes from 'prop-types';
import ReviewList from './list/list.component';
import Ratings from '../ratings/ratings.component';
import Form from './form/form.component';
import './reviews-styles.scss';

class Reviews extends React.Component {
  constructor(props, { id }) {
    super(props, { id });
    this.state = {
      reviews: [],
      filteredReviews: [],
      ratings: {},
      formattedRating: {},
      factors: {},
      count: 2,
      filteredReviewsValue: 0,
      totalReviews: 0,
      sort: 'newest',
      show: false,
      showFull: false,
      rating: 3.2,
      recommended: 92,
    };
  }

  componentDidMount() {
    this.getReviews();
    this.getRatings();
  }

  getReviews = async () => {
    const { id } = this.props;
    const { sort } = this.state;
    try {
      const data = await fetch(`http://18.212.32.182/reviews/${id}/list?count=1000&sort=${sort}`);
      const res = await data.json();
      this.setState({ reviews: res.results, filteredReviews: res.results });
    } catch (err) {
      return err;
    }
  }

  getRatings = async () => {
    const { id } = this.props;
    try {
      const data = await fetch(`http://18.212.32.182/reviews/${id}/meta`);
      const results = await data.json();
      const apiRes = results.ratings;
      const defaultRatings = {
        5: 0, 4: 0, 3: 0, 2: 0, 1: 0,
      };

      Object.keys(defaultRatings).forEach((el) => {
        if (apiRes[el]) defaultRatings[el] = apiRes[el];
      });
      this.setState({
        ratings: results, formattedRating: defaultRatings, factors: results.characteristics,
      }, () => {
        this.getPercentage();
        this.getOverallRating();
      });
    } catch (err) {
      return err;
    }
  }

  getOverallRating = () => {
    const { ratings: { ratings } } = this.state;
    const totalReviews = Object.values(ratings).reduce((a, b) => a + b);
    const entries = Object.entries(ratings);
    const totalValue = entries.map((el) => el[0] * el[1]).reduce((a, b) => a + b);
    const overallRating = (totalValue / totalReviews).toFixed(1);
    this.setState({ rating: overallRating, totalReviews });
  }

  getPercentage = () => {
    const { ratings: { recommended } } = this.state;
    const totalRecommendations = Object.values(recommended).reduce((a, b) => a + b);
    const percentage = Object.values(recommended)[1] / totalRecommendations;
    if (!isNaN(percentage)) {
      this.setState({ recommended: parseInt(percentage * 100, 0) });
    }
  }

  getFilterValue = (e) => {
    const { value } = e.target;
    this.setState({ filteredReviewsValue: value });
  };

  handleChange = (e) => {
    this.setState({ sort: e.target.value }, () => {
      this.getReviews();
    });
  }

  loadMoreReviews = () => {
    const { count } = this.state;
    this.setState({ count: count + 2, filteredReviewsValue: 0 });
  }

  enlargeImage = () => {
    const { showFull } = this.state;
    this.setState({ showFull: !showFull });
  }

  toggleModal = () => {
    const { show } = this.state;
    this.setState({ show: !show });
  }

  render() {
    const {
      reviews, show, count, ratings, rating, recommended,
      filteredReviews, filteredReviewsValue,
      totalReviews, formattedRating, factors, showFull,
    } = this.state;
    const { id } = this.props;
    return (
      <div className="parent-container">
        <div className="reviewsContainer">
          <p>Ratings and Reviews</p>
          <Ratings
            ratings={ratings}
            rating={rating}
            factors={factors}
            formattedRating={formattedRating}
            recommended={recommended}
            getFilterValue={this.getFilterValue}
            totalReviews={totalReviews}
          />
          <ReviewList
            totalReviews={reviews.length}
            filteredReviews={filteredReviews}
            reviews={reviews.slice(0, count)}
            filteredReviewsValue={filteredReviewsValue}
            handleChange={this.handleChange}
            loadMoreReviews={this.loadMoreReviews}
            toggleModal={this.toggleModal}
            enlargeImage={this.enlargeImage}
            showFull={showFull}
          />
        </div>
        <div>
          <Form
            id={id}
            show={show}
            toggleModal={this.toggleModal}
            getReviews={this.getReviews}
            getRatings={this.getRatings}
          />
        </div>
      </div>
    );
  }
}

export default Reviews;

Reviews.propTypes = {
  id: propTypes.string.isRequired,
};
