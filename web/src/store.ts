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

const persistConfig = {
  key: "root",
  storage,
};

const persistedReducer = persistReducer(persistConfig, reducers);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(emptySplitApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
