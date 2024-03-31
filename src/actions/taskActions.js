import { ADD_TASK, GET_TASKS, GET_TASKS_PER_PAGE, LOGIN_USER, SET_SORT_BY, UPDATE_PAGE_NUMBER } from './types';
import { UPDATE_TASK } from './types';

const BASE_URL = '128.140.7.40:5000';

export const addTask = (task) => async (dispatch) => {
  try {
    const { username, email, text, status } = task;

    const ACCESS_TOKEN = localStorage.getItem('token');
    const requestBody = {
      username,
      email,
      text,
      status
    };

    const requestOptions = {
      method: 'POST',
      headers: ACCESS_TOKEN ? {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${ACCESS_TOKEN}`
      } : {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(requestBody) 
    };

    const response = await fetch(`${BASE_URL}/create_task`, requestOptions);
    if (!response.ok) {
      throw new Error('Failed to add task');
    }

    const data = await response.json();
    dispatch({ type: ADD_TASK, payload: data });
  } catch (error) {
    console.error('Error adding task:', error);
  }
};


export const updateTask = (task) => async (dispatch) => {
  try {
    const { username, email, text, status } = task;
    const ACCESS_TOKEN = localStorage.getItem('token');

    const requestBody = {
      username,
      email,
      text,
      status
    };


    const requestOptions = {
      method: 'POST',
      headers: ACCESS_TOKEN ? {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${ACCESS_TOKEN}`
      } : {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(task)
    };

    const response = await fetch(`${BASE_URL}/update_task/${task.id}`, requestOptions);
    if (!response.ok) {
      throw new Error('Failed to update task');
    }

    const data = await response.json();
    dispatch({ type: UPDATE_TASK, payload: data });
  } catch (error) {
    console.error('Error updating task:', error);
  }
};


export const getTasksPerPage = (page, sortBy) => dispatch => {
  const ACCESS_TOKEN = localStorage.getItem('token');

  let url = `${BASE_URL}/get_tasks?page=${page}`;

  if (sortBy) {
    url += `&sort=${sortBy}`;
    dispatch({ type: SET_SORT_BY, payload: sortBy });
  }

  const requestOptions = {
    method: 'GET',
    headers: ACCESS_TOKEN ? {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${ACCESS_TOKEN}`
    } : {
      'Content-Type': 'application/json',
    }
  };

  fetch(url, requestOptions)
    .then(response => {
      if (!response.ok) {
        throw new Error('Failed to fetch tasks');
      }
      return response.json();
    })
    .then(data => {
      dispatch({ type: GET_TASKS_PER_PAGE, payload: data });
    })
    .catch(error => {
      console.error('Error fetching tasks:', error);
    });
};


export const updatePageNumber = (pageNumber) => {
  return {
    type: UPDATE_PAGE_NUMBER,
    payload: pageNumber
  };
};