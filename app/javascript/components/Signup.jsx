import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { loginUser } from '../actions/index';

const select = dispatch => ({
  loginUser: user => dispatch(loginUser(user)),
})

const mapStateToProps = state => ({
  isLoggedIn: state.userReducer.isLoggedIn,
});

const ConnectedSignup = ({ isLoggedIn, loginUser, history }) => {
  const [userData, setUserData] = useState({
    username: '',
    password: '',
    password_confirmation: '',
    errors: [],
  });

  useEffect(() => {
    return isLoggedIn ? history.push('/') : null;
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData({...userData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { username, password, password_confirmation, errors} = userData;
    const user = {
      username: username,
      password: password,
      password_confirmation: password_confirmation,
    }
      axios.post('http://localhost:3001/users', { user }, { withCredentials: true })
      .then(response => {
        if (response.data.status === 'created') {
          loginUser(response.data.user);
            history.push('/');
        } else {
          throw new Error();
        }
      })
      .catch(err => setUserData({...userData, errors: [err]}));
  }
 
  const { username, password, password_confirmation, errors } = userData;

  const handleErrors = () => (errors.length != 0 ? (
    <>
      {
        errors.map(err => (
          <>
            <div key={err.toString() + username}>
              <p> { err.toString() } </p>
            </div>
          </>
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
      onChange={handleChange}
    />
    <input
      type="text"
      name="password"
      value={password}
      placeholder="Password"
      onChange={handleChange}
    />
    <input
      type="text"
      name="password_confirmation"
      value={password_confirmation}
      placeholder="Password Confirmation"
      onChange={handleChange}
    />
    { handleErrors() }
    <button type="submit">
      Sign Up
    </button>
    </form>
  );
};

ConnectedSignup.propTypes = {
  loginUser: PropTypes.func.isRequired,
  // history: PropTypes.obj.isRequired,
}

const Signup = connect(mapStateToProps, select)(ConnectedSignup);

export default Signup;
