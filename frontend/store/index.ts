import { configureStore } from '@reduxjs/toolkit';
import sessionReducer from './session';
import outfitReducer from './outfit';


const store = configureStore({
    reducer: {
        session: sessionReducer,
        outfit: outfitReducer
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(),
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;

export default store;
