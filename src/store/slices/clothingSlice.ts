import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Screens } from '../../types/common.types';
import { RootState } from '../index';
import moment from 'moment';

class Dog  {
  constructor(public name: string, public age: number) {}
  getAge() {
    return this.age;
  }
  getName() {
    return this.name;
  }
  getBirthDate() {
    return moment().subtract(this.age, 'years').toDate();
  }
}

const initialState = {
  x: new Dog('Fido', 2),
  ui: {
    data: {
      createdOutfits: [],
      itemSuggestions: [],
    },
    common: {
      currentScreen: Screens.Home
    }

  },
  api: {
    requests: {
      clothingList: {},
      clothingIdsByType: { shirts: [], pants: [], shoes: [] }
    }
  },
  common: {}
}


export const clothingSlice = createSlice({
  name: 'clothing',
  extraReducers: 31 as any,
  initialState,
  reducers: {
    setCurrentScreen: (state, action: PayloadAction<Screens>) => {
      state.ui.common.currentScreen = action.payload
    }
  },
});


export const selectUi = (state: RootState) => state.clothing.ui
export const selectUiData = (state: RootState) => selectUi(state).data;

export default clothingSlice.reducer;
