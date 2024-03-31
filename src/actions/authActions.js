import { CLEAR_ERROR, LOGIN_USER, LOGIN_USER_FAILURE, LOGOUT_USER,CHECK_LOGIN_STATUS } from "./types";

export const loginUser = (userData) => async (dispatch) => {
  try {
    const response = await fetch('http://128.140.7.40:5000/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(userData)
    });
    
    const data = await response.json();
    
    if (response.ok) {
      const access_token = data.access_token;
      localStorage.setItem('token', access_token);
      dispatch({ type: LOGIN_USER, payload: data });
    } else {
      dispatch({ type: LOGIN_USER_FAILURE, payload: data });
    }
  } catch (error) {
    console.error('Error logging in:', error);
  }
};

export const logoutUser = () => async (dispatch) => {
  try {
    localStorage.removeItem('token');
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', '');
    
    const requestOptions = {
      method: 'GET', 
      headers: headers,
      
    };

    dispatch({ type: LOGOUT_USER });
  } catch (error) {
    console.error('Error logging out:', error);
  }
};

export const clearError = () => ({
  type: CLEAR_ERROR,
});

export const checkLoginStatus = () => (dispatch) => {
  const isAuthenticated = !!localStorage.getItem('token');
  dispatch({ type: CHECK_LOGIN_STATUS, payload: { isAuthenticated } });
};