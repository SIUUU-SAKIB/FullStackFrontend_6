import { configureStore } from '@reduxjs/toolkit';
import { authApi } from '../redux/slices/authApi';
import { parcelApi } from '../redux/slices/parcelApi';

export const store = configureStore({
  reducer: {
    [authApi.reducerPath]: authApi.reducer,
    [parcelApi.reducerPath]: parcelApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(authApi.middleware, parcelApi.middleware), 
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
