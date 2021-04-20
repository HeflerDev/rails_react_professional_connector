import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Appointment from './subComponents/Appointment';

const mapStateToProps = state => ({
  user: state.userReducer.user.user,
  isLoggedIn: state.userReducer.isLoggedIn,
});

const ConnectedUserProfile = ({history, user, isLoggedIn}) => {
  const [loaded, setLoaded] = useState(false);
  const [appointments, setAppointments] = useState(['No Appointments Registered']);

  useEffect(() => {
    axios.get('/user/appointments')
      .then(res => {
        if (res.data.status === 'fetched') {
          setAppointments(res.data.user_appointments);
        } else {
          throw new Error();
        }
      })
      .then(() => setLoaded(true))
      .catch(err => console.log(err));
  }, []);

  const styleRow = input => {
    if (input % 2 === 0) {
      return "odd";
    }
    return "";
  }

  return (isLoggedIn && loaded ? (
    <div className="stack">
      <h2>Hello, {user.username} !</h2>
      <h3>Your Schedule is bellow</h3>
      <div className="board">
        {
          appointments.map((item, index) => (
            <div key={item.schedule} className={`col-10 col-m-6 ${styleRow(index)}`}>
            <Appointment data={item} userData={user} />
            </div>
          ))
        }
      </div>
    </div>
  ) : (
    <>
      Loading...
    </>
  ));
}

const UserProfile = connect(mapStateToProps)(ConnectedUserProfile);

export default UserProfile;
