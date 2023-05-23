import React, { useCallback, useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { alertConfigSelector, setAlertConfigAction } from '../store/slices/common/commonSlice';
// import { useAppDispatch, useAppSelector } from '../../../store/hooks';


export type Severity = 'error' | 'success' | 'info' | 'warning';
export const useAlert = (): {
    props: {
        open: boolean;
        onClose: () => void;
        severity: Severity | undefined;
    };
    message: string;
} => {
    const dispatch = useAppDispatch();

    const { message, severity, isOpen } = useAppSelector(alertConfigSelector);

    const handleCloseSnack = useCallback(() => {
        dispatch(setAlertConfigAction(null));
    }, [dispatch]);


    const alertProps = {
        open: isOpen,
        onClose: handleCloseSnack,
        severity: severity as Severity,
    };

    return { props: alertProps, message };
};

export const useDispatchAlert = () => {
    const dispatch = useAppDispatch();
    const dispatchAlert = (severity: Severity, message: string, isOpen: boolean) => {
        console.log(severity, message, isOpen)
        dispatch(
            setAlertConfigAction({
                severity,
                message,
                isOpen
            })
        );
    };
    return dispatchAlert;
};


export const alertHooks = {
    useAlert,
    useDispatchAlert,
};
export default useAlert;
