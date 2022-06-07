import { Reducer } from "redux";
import { PersistConfig } from "redux-persist";

import {
  combineReducers,
  configureStore,
  getDefaultMiddleware,
} from "@reduxjs/toolkit";
import { emptySplitApi } from "./api";
import storage from "redux-persist/lib/storage";
import { persistReducer } from "redux-persist";

import authSlice from "./features/auth/authSlice";

const reducers = combineReducers({
  auth: authSlice,
  [emptySplitApi.reducerPath]: emptySplitApi.reducer,
});

const rootReducer: Reducer = (state: RootState, action) => {
  if (action.type === "auth/logoutUser") {
    storage.removeItem("persist:root");
    state = {} as RootState;
  }
  return reducers(state, action);
};

const persistConfig: PersistConfig<any> = {
  key: "root",
  storage,
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(emptySplitApi.middleware),
});

export type RootState = ReturnType<typeof rootReducer>;
