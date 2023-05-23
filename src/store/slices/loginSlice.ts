import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState, AppThunk } from '../../store';

export interface LoginSliceState {
    ui: {},
    data: {
        requests: {
            firstLogin: {
                status: boolean,
                serverAuthToken: string | null,
                currentUserName: string | null,
            },
            isLoggedIn: boolean,
        }
    }
}

const initialState: LoginSliceState = {
    ui: {},
    data: {
        requests: {
            firstLogin: {
                status: false,
                serverAuthToken: null,
                currentUserName: null,
            },
            isLoggedIn: false
        }
    }
};


export const loginSlice = createSlice({
  name: 'login',
  initialState,
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: {
    setIsFirstLoginStatus: (state, action: PayloadAction<boolean>) => {
      // Redux Toolkit allows us to write "mutating" logic in reducers. It
      // doesn't actually mutate the state because it uses the Immer library,
      // which detects changes to a "draft state" and produces a brand new
      // immutable state based off those changes
      state.data.requests.firstLogin.status = action.payload;
    },
    setCurrentUserName: (state, action: PayloadAction<string | null>) => {
        state.data.requests.firstLogin.currentUserName = action.payload;
    },
    setServerAuthToken: (state, action: PayloadAction<string | null>) => {
        state.data.requests.firstLogin.serverAuthToken = action.payload;
    }
    ,
    setIsLoggedIn: (state, action: PayloadAction<boolean>) => {
        state.data.requests.isLoggedIn = action.payload;
    }
    
  },


});

export const 
{
     setIsFirstLoginStatus: setIsFirstLoginStatusAction,
     setServerAuthToken: setServerAuthTokenAction, 
     setCurrentUserName: setCurrentUserNameAction,
     setIsLoggedIn: setIsLoggedInAction
} = loginSlice.actions;


// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state: RootState) => state.counter.value)`
export const loginRootSelector = (state: RootState) => state.login;




export default loginSlice.reducer;