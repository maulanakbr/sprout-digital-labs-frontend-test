'use client';

import { Action, combineReducers, configureStore, ThunkAction } from '@reduxjs/toolkit';
import { createWrapper } from 'next-redux-wrapper';
import {
  FLUSH,
  PAUSE,
  PERSIST,
  persistReducer,
  persistStore,
  PURGE,
  REGISTER,
  REHYDRATE,
} from 'redux-persist';
import type { Persistor } from 'redux-persist/es/types';
import storage from 'redux-persist/lib/storage';

import rootServices from './root-services';
import rootSlices from './root-slices';

const persistConfig = {
  key: 'root',
  storage,
};

const combinedReducers = combineReducers({
  ...rootServices.reducers,
  ...rootSlices.reducers,
});

const persistedReducers = persistReducer(persistConfig, combinedReducers);

export const makeStore = () =>
  configureStore({
    reducer: persistedReducers,
    devTools: false,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        serializableCheck: {
          ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
        },
      }).concat(rootServices.middlewares),
  });

export const store = makeStore();
export const persistor: Persistor = persistStore(store);

export type Store = typeof store;
export type RootState = ReturnType<typeof store.getState>;
export type Dispatch = typeof store.dispatch;
export type Thunk<ReturnType = void> = ThunkAction<ReturnType, RootState, unknown, Action<string>>;

export const wrapper = createWrapper<Store>(makeStore);
