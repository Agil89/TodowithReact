import { configureStore, applyMiddleware } from "@reduxjs/toolkit";
import rootReducer from "../reducers/rootReducer";
import { thunk } from 'redux-thunk';

const middleware = [thunk];

const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(middleware)
});

export default store;
