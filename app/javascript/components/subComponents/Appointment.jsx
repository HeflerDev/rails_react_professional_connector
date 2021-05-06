/* eslint-disable camelcase */
import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import axios from 'axios';

const Appointment = ({ data }) => {
  const [profData, setProfData] = useState(null);

  const {
    professional_id,
    schedule,
    id,
  } = data;

  const handleCancel = () => {
    axios.delete(`http://localhost:3001/appointments/${id}`)
      .then((response) => {
        if (response.data.message === 'deleted') {
          setProfData(null);
        } else {
          throw new Error('Couldn\'t delete');
        }
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    axios.get(`/api/v1/show/${professional_id}`)
      .then((res) => {
        if (res.statusText === 'OK') {
          setProfData(res.data);
        } else {
          throw new Error();
        }
      })
      .catch((err) => console.log(err));
  }, []);

  const dateReg = schedule.match(/^\d+-\d+-\d+/g);
  const timeReg = schedule.match(/\d+:\d+:\d+/g);

  return profData ? (
    <div className="appointment-container">
      <div className="board between">
        <Link to={`show/${professional_id}`} className="col-l-2 col-m-12 queue column center">
          <img src={profData.image} alt="" />
        </Link>
        <div className="col-l-6 col-m-12 queue column">
          <h2>{profData.name}</h2>
          <h3>{profData.category}</h3>
          <p>
            Meeting Time: at
            {timeReg}
            , in
            {dateReg}
            .
          </p>
        </div>
        <div className="col-l-2 col-m-12 queue column">
          <button type="button" className="btn-attend">Attend Meeting</button>
          <button type="button" className="btn-cancel" onClick={handleCancel}>Cancel</button>
        </div>
      </div>
    </div>
  ) : (
    null
  );
};

Appointment.propTypes = {
  data: PropTypes.shape({
    professional_id: PropTypes.number.isRequired,
    schedule: PropTypes.string.isRequired,
    id: PropTypes.number.isRequired,
  }).isRequired,
};

export default Appointment;
