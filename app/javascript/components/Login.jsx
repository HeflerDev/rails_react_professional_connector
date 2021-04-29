import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import { connect } from 'react-redux';
import { loginUser } from '../actions/index';

const select = (dispatch) => ({
  loginUser: (user) => dispatch(loginUser(user)),
});

const mapStateToProps = (state) => ({
  isLoggedIn: state.userReducer.isLoggedIn,
});

const ConnectedLogin = ({ loginUser, isLoggedIn, history }) => {
  const [userData, setUserData] = useState({
    username: '',
    password: '',
    error: null,
  });

  useEffect(() => (isLoggedIn ? history.push('/') : null));

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { username, password } = userData;
    const user = {
      username,
      password,
    };
    axios.post('/login', { user }, { withCredentials: true })
      .then((res) => {
        if (res.data.logged_in) {
          loginUser(res.data.user);
          history.push('/');
        } else {
          throw new Error();
        }
      })
      .catch((err) => { setUserData({ ...userData, error: [err] }); });
  };

  const { username, password } = userData;

  return (
    <form onSubmit={handleSubmit} className="stack center signup-form">
      <label htmlFor="username" className="board center">
        <div className="col-10">User Name</div>
        <input
          className="col-10"
          type="text"
          name="username"
          value={username}
          onChange={handleChange}
        />
      </label>
      <label htmlFor="password" className="board center">
        <div className="col-10">Password</div>
        <input
          className="col-10"
          type="password"
          name="password"
          value={password}
          onChange={handleChange}
        />
      </label>
      <button type="submit">Submit</button>
    </form>
  );
};

ConnectedLogin.propTypes = {
  loginUser: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.func.isRequired,
  history: PropTypes.func.isRequired,
};

const Login = connect(mapStateToProps, select)(ConnectedLogin);

export default Login;
