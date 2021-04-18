import React from 'react';
import { Link } from 'react-router-dom';

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
      <Link to={`/show/${id}`} className="board">
        <div className="col-l-11 queue center">
          <img src={image} alt="profile pic" />
        </div>
        <div className="col-l-11 queue between">
          <span>Name:{name}</span>
          <span>Role: {category}</span>
        </div>
        <div className="col-l-11 queue between">
          <span>{`Wage:${hourly_wage}${currency}`}</span>
          <span>{working_days}</span>
        </div>
      </Link>
    </div>
  )
};

export default ProfessionalsSelector;