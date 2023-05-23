import { configureStore } from '@reduxjs/toolkit';
import clothingReducer from './slices/clothingSlice';

export const store = configureStore({
  reducer: {
    clothing: clothingReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
