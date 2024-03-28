// actions/authActions.js
import axios from 'axios';
import { LOGIN_USER, LOGIN_USER_FAILURE, LOGOUT_USER, CLEAR_ERROR } from './types';

const ACCESS_TOKEN = localStorage.getItem('token')
const axiosInstance = axios.create({
  baseURL: 'http://127.0.0.1:5002',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${ACCESS_TOKEN}`
  },
  
});

export const loginUser = (userData) => async (dispatch) => {
  try {
    const res = await axiosInstance.post('/login', userData);
    dispatch({ type: LOGIN_USER, payload: res.data });
    const access_token = res.data.access_token
    localStorage.setItem('token', access_token);
    if(res.data.success == false){
      dispatch({ type: LOGIN_USER_FAILURE, payload: res.data });
    }
  } catch (error) {
    console.error('Error logging in:', error);
  }
};

export const logoutUser = () => ({
  type: LOGOUT_USER,
});


export const clearError = () => ({
  type: CLEAR_ERROR,
});