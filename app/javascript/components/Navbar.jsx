import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { logoutUser } from '../actions/index';

import Logo from '../../assets/images/logo.png';

const mapStateToProps = (state) => ({
  isLoggedIn: state.userReducer.isLoggedIn,
  userData: state.userReducer.userData,
});

const select = (dispatch) => ({
  logoutUser: () => dispatch(logoutUser()),
});

const ConnectedNavbar = ({
  isLoggedIn, userData, logoutUser,
}) => {
  const [utilsContainer, setUtilsContainer] = useState(null);

  const handleClick = () => {
    axios.delete('/logout', { withCredentials: true })
      .then(() => {
        logoutUser();
      });
  };

  const renderLoggedIn = () => (
    <>
      <div className="queue center">
        <div className="hello-text">
          Hello,
          { userData.username }
          !
        </div>
      </div>
      <Link to="/profile" className="queue center">
        <span>Profile</span>
      </Link>
      <button type="button" onClick={handleClick}>
        <span>Logout</span>
      </button>
    </>
  );

  const renderLoggedOut = () => (
    <>
      <Link to="/signup" className="queue center">
        <span>Sign Up!</span>
      </Link>
      <Link to="/login" className="queue center">
        <span>Login</span>
      </Link>
    </>
  );

  useEffect(() => {
    if (isLoggedIn) {
      setUtilsContainer(renderLoggedIn);
    } else {
      setUtilsContainer(renderLoggedOut);
    }
  }, [userData, isLoggedIn]);

  return (
    <nav className="board queue between">
      <div className="company-logo col-12 col-m-4 col-l-3">
        <Link to="/">
          <img src={Logo} alt="" className="logo" />
          <span>Brand Name</span>
        </Link>
      </div>
      <div className="utils-container queue end col-12 col-m-7 col-l-4">
        { utilsContainer }
      </div>
    </nav>
  );
};

ConnectedNavbar.propTypes = {
  isLoggedIn: PropTypes.bool.isRequired,
  logoutUser: PropTypes.func.isRequired,
  userData: PropTypes.shape({
    id: PropTypes.number.isRequired,
    username: PropTypes.string.isRequired,
  }),
};

const Navbar = connect(mapStateToProps, select)(ConnectedNavbar);

export default Navbar;
