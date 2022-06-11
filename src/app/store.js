import { createStore } from 'redux';
import { configureStore } from '@reduxjs/toolkit';
import useReducer from '../features/userSlice';

export default configureStore({
  reducer: {
    user: useReducer
  }
});

const store = createStore(useReducer);

export { store };
