import React from 'react';
import propTypes from 'prop-types';
import moment from 'moment';
import './listitemheader-styles.scss';

const ListItemHeader = ({ rating, user, date }) => (
  <header>
    <h5>{`${rating} stars, ${user}, ${moment(date).format('MMMM D, YYYY')}`}</h5>
  </header>
);

export default ListItemHeader;

ListItemHeader.propTypes = {
  rating: propTypes.number.isRequired,
  user: propTypes.string.isRequired,
  date: propTypes.string.isRequired,
};
