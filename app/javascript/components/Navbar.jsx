import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { logoutUser } from '../actions/index';

import Logo from '../../assets/images/logo.png';

const mapStateToProps = (state) => ({
  isLoggedIn: state.userReducer.isLoggedIn,
  user: state.userReducer.user.user,
});

const select = (dispatch) => ({
  logoutUser: () => dispatch(logoutUser()),
});

const ConnectedNavbar = ({
  isLoggedIn, user, logoutUser,
}) => {
  const [utils, setUtils] = useState(null);

  const handleClick = () => {
    axios.delete('/logout', { withCredentials: true })
      .then(() => {
        logoutUser();
      });
  };

  useEffect(() => {
    if (isLoggedIn && user) {
      setUtils(
        <>
          <div className="queue center">
            <div className="hello-text">
              Hello,
              { user.username }
              !
            </div>
          </div>
          <Link to="/profile" className="queue center">
            <span>Profile</span>
          </Link>
          <button type="button" onClick={handleClick}>
            <span>Logout</span>
          </button>
        </>,
      );
    } else {
      setUtils(
        <>
          <Link to="/signup" className="queue center">
            <span>Sign Up!</span>
          </Link>
          <Link to="/login" className="queue center">
            <span>Login</span>
          </Link>
        </>,
      );
    }
  });

  return (
    <nav className="board queue between">
      <div className="company-logo col-12 col-m-4 col-l-3">
        <Link to="/">
          <img src={Logo} alt="" className="logo" />
          <span>Brand Name</span>
        </Link>
      </div>
      <div className="utils-container queue end col-12 col-m-7 col-l-4">
        { utils }
      </div>
    </nav>
  );
};

ConnectedNavbar.propTypes = {
  isLoggedIn: PropTypes.bool.isRequired,
  logoutUser: PropTypes.func.isRequired,
  user: PropTypes.shape({
    id: PropTypes.number.isRequired,
    username: PropTypes.string.isRequired,
  }),
};

ConnectedNavbar.defaultProps = {
  user: null,
};

const Navbar = connect(mapStateToProps, select)(ConnectedNavbar);

export default Navbar;
