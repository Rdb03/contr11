import {configureStore, combineReducers} from "@reduxjs/toolkit";
import { FLUSH, PAUSE, PERSIST, persistReducer, persistStore, PURGE, REGISTER, REHYDRATE } from 'redux-persist';
import storage from "redux-persist/lib/storage";
import {usersReducer} from "../containers/users/usersSlice.ts";
import {commodityReducer} from "../containers/commodity/commoditiesSlice.ts";
import {infoReducer} from "../containers/fullCommodity/fullCommoditySlice.ts";

const usersPersistConfig = {
  key: 'forum:users',
  storage,
  whitelist: ['user'],
};

const rootReducer = combineReducers({
    commodity: commodityReducer,
    info: infoReducer,
  users: persistReducer(usersPersistConfig, usersReducer),
});

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        serializableCheck: {
          ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
        },
      }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const persister = persistStore(store);