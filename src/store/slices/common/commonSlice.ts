/* eslint-disable no-param-reassign */
/* eslint-disable no-return-assign */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Severity } from '../../../hooks/useAlert';
import { RootState } from '../..';

// Define the initial state using that type
export interface SetUserDetailsPayload {
    departmentCode: string | null;
}
// * Slice
export interface CommonSliceState {
    alert: {
        severity: Severity;
        message: string;
        isOpen: boolean;
    };

}

const initialAlertState = {
    severity: 'error',
    message: '',
    isOpen: false,
} as const;

const initialState: CommonSliceState = {
    alert: initialAlertState,
};


export type AlertConfigPayload = null | {
    severity: Severity;
    message: string;
    isOpen: boolean;
};
export const commonSlice = createSlice({
    name: 'common',
    // `createSlice` will infer the state type from the `initialState` argument
    initialState,
    reducers: {
        setAlertConfig: (state: CommonSliceState, action: PayloadAction<AlertConfigPayload>) => {
            if (action.payload) {
                state.alert = action.payload;
                console.log('tamir', action.payload)
                return;
            }
            state.alert.isOpen = initialAlertState.isOpen;
        },
    },
});

// * Exports
// ^ Actions
export const {
    setAlertConfig: setAlertConfigAction,
} = commonSlice.actions;
// Other code such as selectors can use the imported `RootState` type
// ^ Selectors
export const commonRootSelector = (state: RootState): CommonSliceState => state.common;

export const alertConfigSelector = (state: RootState) => commonRootSelector(state).alert;

export default commonSlice.reducer;
