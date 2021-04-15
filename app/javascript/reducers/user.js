import { LOGIN_USER, LOGOUT_USER } from '../actions/action-types';

const defaultState = {
  isLoggedIn: false,
  user: {},
}

function userReducer(state = defaultState, action) {
  switch(action.type) {
    case LOGIN_USER:
      return { isLoggedIn: true, user: action.payload } ;
    case LOGOUT_USER:
      return defaultState;
    default:
      return state;
  }
}

export default userReducer;
