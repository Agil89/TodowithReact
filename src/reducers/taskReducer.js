import { GET_TASKS, ADD_TASK, UPDATE_TASK, GET_TASKS_PER_PAGE } from "../actions/types";

const initialState = {
  tasks: [],
  pages:''
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
    default:
      return state;
  }
};
export default taskReducer;
