import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import { connect } from 'react-redux';
import Routes from './routes/Routes';
import { loginUser, logoutUser } from '../actions/index';

const select = (dispatch) => ({
  loginUser: (user) => dispatch(loginUser(user)),
  logoutUser() { dispatch(logoutUser()); },
});

const ConnectedApp = ({ loginUser }) => {
  useEffect(() => {
    axios.get('/logged_in',
      { withCredentials: true })
      .then((response) => {
        if (response.data.logged_in) {
          loginUser(response.data);
        } else {
          logoutUser(response.data);
        }
      })
      .catch((error) => console.log('api errors:', error));
  });
  return (
    <Routes />
  );
};

ConnectedApp.propTypes = {
  loginUser: PropTypes.func.isRequired,
};

const App = connect(null, select)(ConnectedApp);

export default App;
