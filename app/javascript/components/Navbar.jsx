import React from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { logoutUser } from '../actions/index';

import Logo from '../../assets/images/logo.png';

const mapStateToProps = state => ({
  isLoggedIn: state.userReducer.isLoggedIn,
  user: state.userReducer.user.user,
});

const select = dispatch => ({
  logoutUser: () => dispatch(logoutUser()),
});

const ConnectedNavbar = ({ history, isLoggedIn, user, logoutUser }) => {
  const handleClick = () => {
    axios.delete('http://localhost:3001/logout', { withCredentials: true })
      .then(() => {
        logoutUser();
        history.push('/');
      })
  };

  const renderUtilities = () => (isLoggedIn ? (
    <>
    <div className="queue center">
      <div className="hello-text">Hello, { user.username }!</div>
    </div>
    <Link to="/profile" className="queue center" >
      <span>Profile</span>
    </Link>
    <button type="button" onClick={handleClick}>
      <span>Logout</span>
    </button>
    </>
  ) : (
    <>
    <Link to="/signup" className="queue center">
      <span>Sign Up!</span>
    </Link>
    <Link to="/login" className="queue center">
      <span>Login</span>
    </Link>
    </>
  ))

  return (
    <nav className="board queue between">
    <div className="company-logo col-12 col-l-3">
      <Link to="/">
        <img src={Logo} alt="" className="logo" />
        <span>Brand Name</span>
      </Link>
    </div>
    <div className="utils-container queue end col-12 col-m-4 col-l-4">
      { renderUtilities() }
    </div>
    </nav>
  )
};

const Navbar = connect(mapStateToProps, select)(ConnectedNavbar);

export default Navbar;
