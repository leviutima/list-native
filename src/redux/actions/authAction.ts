import { UserProps } from "../../utils/interfaces";

export const LOGIN_REQUEST = 'LOGIN_REQUEST';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_FAILURE = 'LOGIN_FAILURE';
export const SET_USER = 'SET_USER'

export const loginRequest = (payload: { email: string; password: string }) => ({
  type: LOGIN_REQUEST,
  payload,
});

export const loginSuccess = (user: UserProps) => ({
  type: LOGIN_SUCCESS,
  payload: user,
});

export const loginFailure = (error: string) => ({
  type: LOGIN_FAILURE,
  payload: error,
});

export const logout = () => ({
  type: 'LOGOUT',
});

export const setUser = (user: any) => ({
  type: 'SET_USER',
  payload: user,
});
