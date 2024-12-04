// src/store/index.ts

import { configureStore } from '@reduxjs/toolkit';
import sessionReducer from './session';

const store = configureStore({
    reducer: {
        session: sessionReducer,
    },
    // You can customize the middleware setup if needed
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(),
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;

export default store;
