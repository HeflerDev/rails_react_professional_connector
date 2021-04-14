import React, { useState } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { loginUser } from '../actions/index';

const select = dispatch => ({
  loginUser: user => dispatch(loginUser(user)),
})

const ConnectedSignup = ({ loginUser, history }) => {
  const [userData, setUserData] = useState({
    username: '',
    password: '',
    password_confirmation: '',
    errors: [],
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData({...userData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault;
    const { username, password, password_confirmation, errors} = userData;
    const user = {
      username: username,
      password: password,
      password_confirmation: password_confirmation,
    }
      axios.post('https://localhost:3001/users', { user }, { withCredentials: true })
      .then(response => {
        if (response.data.status === 'created') {
          loginUser(response.data);
            history.push('/');
        } else {
          throw new Error();
        }
      })
      .catch(err => setUserData({...userData, errors: [...errors, err]}));
  }

  const { username, password, password_confirmation, errors } = userData;

  const handleErrors = () => (errors.length =! 0 ? (
    <>
      {
        errors.map(err => (
          <p> {err} </p>
        ))
      }
    </>
  ) : (
    null
  ));

  return (
    <form onSubmit={handleSubmit}>
    <input
      type="text"
      name="username"
      value={username}
      placeholder="User Name"
      onchange={handleChange}
    />
    <input
      type="text"
      name="password"
      value={password}
      placeholder="Password"
      onchange={handleChange}
    />
    <input
      type="text"
      name="password_confirmation"
      value={password_confirmation}
      placeholder="Password Confirmation"
      onchange={handleChange}
    />
    <button type="submit">
      Sign Up
    </button>
    </form>
  );
};

const ConnectedSignup.propTypes = {
  loginUser: PropTypes.func.isRequired,
  history: PropTypes.func.isRequired,
}

const Signup = connect(null, select)(ConnectedSignup);

export default Signup;
