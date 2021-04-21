import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const Appointment = ({ data, userData }) => {
  const [profData, setProfData] = useState(null);
  const [deleted, setDeleted] = useState(false);
  
  const {
    professional_id,
    schedule,
    id,
  } = data;

  const handleCancel = () => {
    axios.delete(`http://localhost:3001/appointments/${id}`)
      .then(res => {
        if (res.message === 'deleted') {
          setDeleted(true);
        }
        throw new Error('Couldn\'t delete');
      })
      .catch(err => console.log(err));
  };

  useEffect(() => {
    axios.get(`/api/v1/show/${professional_id}`)
      .then(res => {
        if (res.statusText === 'OK') {
          setProfData(res.data);
        } else {
          throw new Error();
        }
      })
      .catch(err => console.log(err));
  }, []);

  const dateReg = schedule.match(/^\d+-\d+-\d+/g);
  const timeReg = schedule.match(/\d+:\d+:\d+/g);

  if (deleted) {
    return null;
  }
  
  return profData ? (
    <div className="appointment-container">
    <div className="board between">
      <Link to={`show/${professional_id}`} className="col-l-2 col-m-12 queue column center">
         <img src={profData.image} alt="" />
      </Link>
      <div className="col-l-6 col-m-12 queue column">
        <h2>{profData.name}</h2>
        <h3>{profData.category}</h3>
        <p>Meeting Time: at {timeReg}, in {dateReg}.</p>
      </div>
      <div className="col-l-2 col-m-12 queue column">
        <button className="btn-attend">Attend Meeting</button>
        <button className="btn-cancel" onClick={handleCancel}>Cancel</button>
      </div>
    </div>
    </div>
  ) : (
    <>
      <p>Loading...</p>
    </>
  );
}

export default Appointment;
