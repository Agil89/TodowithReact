// actions/index.js
import axios from 'axios';
import { ADD_TASK, GET_TASKS, GET_TASKS_PER_PAGE, LOGIN_USER } from './types';
import { UPDATE_TASK } from './types';


const ACCESS_TOKEN = localStorage.getItem('token')
const axiosInstance = axios.create({
  baseURL: 'http://127.0.0.1:5002',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${ACCESS_TOKEN}`
  },
  
});


export const addTask = (task) => async (dispatch) => {
  try {
    const res = await axiosInstance.post('/create_task', task);
    dispatch({ type: ADD_TASK, payload: res.data });
  } catch (error) {
    console.error('Error adding task:', error);
  }
};

export const updateTask = (task) => async (dispatch) => {
  try {
    const res = await axiosInstance.post(`/update_task/${task.id}`, task); // Assuming the endpoint for updating a task is /tasks/:id
    dispatch({ type: UPDATE_TASK, payload: res.data });
  } catch (error) {
    console.error('Error updating task:', error);
  }
};

export const getTasks = () => async (dispatch) => {
  try {
    const res = await axios.post('http://127.0.0.1:5002/tasks', );
    dispatch({ type: GET_TASKS, payload: res.data });
  } catch (error) {
    console.error('Error adding task:', error);
  }
};

export const getTasksPerPage = (page) => dispatch => {
  axiosInstance.get(`/get_tasks?page=${page}`)
    .then(res => {
      dispatch({
        type: GET_TASKS_PER_PAGE,
        payload: res.data
      });
    })
    .catch(err => console.log(err));
};