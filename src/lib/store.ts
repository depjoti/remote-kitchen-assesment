

import { configureStore } from '@reduxjs/toolkit';
import foodReducer from '../lib/features/FoodSlice';

export const store = configureStore({
  reducer: {
    food: foodReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;



