/* eslint-disable consistent-return */
import React from 'react';
import propTypes from 'prop-types';
import RatingsSummary from './ratingssummary/ratingssummary.component';
import './ratings-styles.scss';

const Ratings = ({ rating, recommended, filterList }) => (
  <div className="ratingsContainer">
    <RatingsSummary
      rating={parseFloat(rating)}
      recommended={recommended}
      filterList={filterList}
    />
  </div>
);


export default Ratings;

Ratings.propTypes = {
  rating: propTypes.string.isRequired,
  recommended: propTypes.number.isRequired,
  filterList: propTypes.func.isRequired,
};
