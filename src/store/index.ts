import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import commonSlice from './slices/common/commonSlice';
import loginSlice from './slices/loginSlice';

export const store = configureStore({
  reducer: {
    login: loginSlice,
    common: commonSlice,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
