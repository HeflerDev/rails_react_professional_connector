import React from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { logoutUser } from '../../actions/index';

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
    <p>Hello, { user.username } </p>
    <Link to="/profile" >
      <p>Profile</p>
    </Link>
    <button type="button" onClick={handleClick}>
      <p>Logout</p>
    </button>
    </>
  ) : (
    <>
    <Link to="/signup">
      <p>Sign Up!</p>
    </Link>
    <Link to="/login">
      <p>Login</p>
    </Link>
    </>
  ))

  return (
    <nav className="board queue between">
    <div className="company-logo col-12 col-l-3">
      Logo
    </div>
    <div className="utils-container queue end col-12 col-l-4">
      { renderUtilities() }
    </div>
    </nav>
  )
};

const Navbar = connect(mapStateToProps, select)(ConnectedNavbar);

export default Navbar;
