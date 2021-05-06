import { LOGIN_USER, LOGOUT_USER } from '../actions/action-types';

const defaultState = {
  isLoggedIn: false,
  user: {},
};

function userReducer(state = defaultState, action) {
  switch (action.type) {
    case LOGIN_USER:
      return { ...state, isLoggedIn: true, userData: action.payload };
    case LOGOUT_USER:
      return defaultState;
    default:
      return state;
  }
}

export default userReducer;
