import { LOGIN_USER, LOGOUT_USER } from './action-types';

export const logoutUser = () => ({ type: LOGOUT_USER });
export const loginUser = payload => ({ type: LOGIN_USER, payload });
