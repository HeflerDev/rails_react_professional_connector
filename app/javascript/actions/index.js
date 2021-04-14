import { LOGIN_USER, LOGOUT_USER } from './action-types';

export const logoutUser = payload => ({ type: LOGOUT_USER, payload });
export const loginUser = payload => ({ type: LOGIN_USER, payload });
