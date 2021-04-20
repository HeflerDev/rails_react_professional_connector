import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Appointment = ({ data, userData }) => {
  const [profData, setProfData] = useState(null);
  
  const {
    professional_id,
    schedule,
  } = data;

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
  
  return profData ? (
    <div className="appointment-container">
    <div className='board between'>
      <div className="col-l-2 col-m-12">
         <img src={profData.image} alt="" />
      </div>
      <div className="col-l-6 col-m-12 queue column">
        <h2>{profData.name}</h2>
        <h3>{profData.category}</h3>
        <p>Meeting Time: at {timeReg}, in {dateReg}.</p>
      </div>
      <div className="col-l-2 col-m-12 queue column">
        <button className="btn-attend">Attend Meeting</button>
        <button className="btn-cancel">Cancel</button>
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
