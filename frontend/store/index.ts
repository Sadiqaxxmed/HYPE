import { configureStore } from '@reduxjs/toolkit';
import sessionReducer from './session';
import outfitReducer from './outfit';
import reviewReducer from './reviews';


const store = configureStore({
    reducer: {
        session: sessionReducer,
        outfit: outfitReducer,
        review: reviewReducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(),
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;

export default store;
