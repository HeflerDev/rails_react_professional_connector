import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

const mapStateToProps = state => ({
  user: state.userReducer.user.user,
  isLoggedIn: state.userReducer.isLoggedIn,
});

const ConnectedUserProfile = ({history, user, isLoggedIn}) => {

  console.log(user);
  return (isLoggedIn ? (
    <div className="stack">
      <h2>Hello, {user.username} !</h2>
      
      <button>See Next Appointments</button>
    </div>
  ) : (
    <>
      Loading...
    </>
  ));
}

const UserProfile = connect(mapStateToProps)(ConnectedUserProfile);

export default UserProfile;
