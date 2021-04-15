import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { loginUser } from '../actions/index';

const select = dispatch => ({
  loginUser: user => dispatch(loginUser(user)),
});

const mapStateToProps = state => ({
  isLoggedIn: state.userReducer.isLoggedIn,
});

const ConnectedLogin = ({ loginUser, isLoggedIn, history }) => {
  const [userData, setUserData] = useState({
    username: '',
    password: '',
    error: null,
  });

  useEffect(() => {
    return isLoggedIn ? history.push('/') : null ;
  });

  const handleChange = e => {
    const { name, value } = e.target;
    setUserData({...userData, [name]: value });
  };

  const handleSubmit = e => {
    e.preventDefault();
    const { username, password, error } = userData;
    const user = {
      username: username,
      password: password,
    }
    axios.post('http://localhost:3001/login', { user }, { withCredentials:true })
    .then(res => {
      if (res.data.logged_in) {
        loginUser(res.data.user);
        history.push('/');
      } else {
        throw new Error();
      }
    })
      .catch(err => { setUserData({...userData, error: [err]})});
  };


  const { username, password, error } = userData;

  return (
    <form onSubmit={handleSubmit}>
    <label htmlFor="username">
      <span>Username</span>
      <input
        type="text"
        name="username"
        value={username}
        onChange={handleChange}
      />
    </label>
    <label htmlFor="password">
      <span>Password</span>
      <input
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

const Login = connect(mapStateToProps, select)(ConnectedLogin);

export default Login;
