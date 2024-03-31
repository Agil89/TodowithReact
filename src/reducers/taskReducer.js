// taskReducer.js

import { GET_TASKS, ADD_TASK, UPDATE_TASK, GET_TASKS_PER_PAGE, SET_SORT_BY, UPDATE_PAGE_NUMBER } from "../actions/types";

const initialState = {
  tasks: [],
  pages:'',
  pageNumber:1,
  sortBy: '' 
  
};

const taskReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_TASKS:
      return {
        ...state,
        tasks: action.payload.tasks,
        pages: action.payload.total_pages
      };
    case GET_TASKS_PER_PAGE:
      return {
        ...state,
        tasks: action.payload.tasks,
        pages: action.payload.total_pages
      };
    case ADD_TASK:
      return {
        ...state,
        tasks: action.payload.tasks,
        pages: action.payload.total_pages
      };
    case UPDATE_TASK:
      return {
        ...state,
        tasks: state.tasks.map((task) =>
          task.id === action.payload.task.id
            ? { ...task, ...action.payload.task }
            : task
        ),
      };
    case SET_SORT_BY:
      return {
        ...state,
        sortBy: action.payload 
      };
    case UPDATE_PAGE_NUMBER:
    return {
      ...state,
      pageNumber: action.payload
    };
    default:
      return state;
  }
};
export default taskReducer;
