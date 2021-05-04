import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import axios from 'axios';
import Appointment from './subComponents/Appointment';
import loadingGif from '../../assets/gifs/loading_2.gif';

const mapStateToProps = (state) => ({
  user: state.userReducer.userData,
  isLoggedIn: state.userReducer.isLoggedIn,
});

const ConnectedUserProfile = ({ user, isLoggedIn }) => {
  const [loaded, setLoaded] = useState(false);
  const [appointments, setAppointments] = useState([]);

  useEffect(() => {
    axios.get('/user/appointments')
      .then((res) => {
        if (res.data.status === 'fetched') {
          setAppointments(res.data.user_appointments);
        } else {
          throw new Error();
        }
      })
      .then(() => setLoaded(true))
      .catch((err) => console.log(err));
  }, []);

  const styleRow = (input) => {
    if (input % 2 === 0) {
      return 'odd';
    }
    return '';
  };

  return (isLoggedIn && loaded ? (
    <div className="stack">
      <h2>
        Hello,
        {user.username}
        {' '}
        !
      </h2>
      <h3>Your Schedule is bellow</h3>
      <div className="board center">
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
      <div className="queue center">
        <img src={loadingGif} alt="Loading" />
      </div>
    </>
  ));
};

ConnectedUserProfile.propTypes = {
  user: PropTypes.shape({
    username: PropTypes.string,
    id: PropTypes.number,
  }),
  isLoggedIn: PropTypes.bool.isRequired,
};

ConnectedUserProfile.defaultProps = {
  user: {
    username: null,
    id: null,
  },
};

const UserProfile = connect(mapStateToProps)(ConnectedUserProfile);

export default UserProfile;
