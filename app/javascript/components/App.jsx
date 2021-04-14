import React, { useEffect } from 'react' ;
import axios from 'axios';
import { connect } from 'react-redux';
import Routes from './routes/Routes';
import { loginUser, logoutUser } from '../actions/index';

const select = dispatch => ({
  loginUser: user => dispatch(loginUser(user)),
  logoutUser() { dispatch(logoutUser()) }
});

const ConnectedApp = ({ loginUser }) => {
  useEffect(() => {
      axios.get('http://localhost:3001/logged_in', 
     {withCredentials: true})
      .then(response => {
        if (response.data.logged_in) {
          loginUser(response.data);
        } else {
          logoutUser(response.data); 
        }
      })
      .catch(error => console.log('api errors:', error))
  });
  return(
    <Routes /> 
  );
};

const App = connect(null, select)(ConnectedApp);

export default App;
