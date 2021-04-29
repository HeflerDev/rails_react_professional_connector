/* eslint-disable camelcase */
import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

const ProfessionalsSelector = ({ data }) => {
  const {
    id,
    category,
    name,
    image,
    hourly_wage,
    currency,
    working_days,
  } = data;

  return (
    <div className="selector-container">
      <Link to={`/show/${id}`} className="board center container">
        <div className="col-l-10 queue center">
          <img src={image} alt="profile pic" />
        </div>
        <div className="col-l-11">
          <span>{name}</span>
          {' '}
          <br />
          <span>{category}</span>
        </div>
        <div className="col-l-11 queue between">
          <span>{`Wage:${hourly_wage}${currency}`}</span>
          <span>{working_days}</span>
        </div>
      </Link>
    </div>
  );
};

ProfessionalsSelector.propTypes = {
  data: PropTypes.shape({
    id: PropTypes.number.isRequired,
    category: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
    hourly_wage: PropTypes.string.isRequired,
    currency: PropTypes.string.isRequired,
    working_days: PropTypes.string.isRequired,
  }).isRequired,
};

export default ProfessionalsSelector;
