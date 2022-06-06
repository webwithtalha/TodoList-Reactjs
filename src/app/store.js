import { createStore, applyMiddleware } from "redux";
import { configureStore } from "@reduxjs/toolkit";
import useReducer from "../features/userSlice";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

const persistConfig = {
  key: "main-root",
  storage,
};
export default configureStore({
  reducer: {
    user: useReducer,
  },
});
const persistedReducer = persistReducer(persistConfig, useReducer);

const store = createStore(persistedReducer, applyMiddleware());

const Persistor = persistStore(store);

export { Persistor };
