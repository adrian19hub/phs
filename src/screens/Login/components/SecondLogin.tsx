import React, { useState } from 'react';
import { Button } from '@mui/material';
import { TextField } from '@mui/material';
import { useAppSelector, useAppDispatch } from '../../../store/hooks';
import { loginRootSelector, setIsLoggedInAction, setServerAuthTokenAction } from '../../../store/slices/loginSlice';
import { redirect, Navigate, useNavigate } from 'react-router-dom';
import { useDispatchAlert } from '../../../hooks/useAlert';
import { AUTH_ERROR_MESSAGES } from '../../../constants/errorMessages';
import { AUTH_TOKEN_KEY, AUTH_CURRENT_USER } from '../../../Routing/Routing';
import { InnerContainer } from './FirstLogin';
import { testUrl } from '../../../api';
import { getTwoFactorLogin } from '../../../api/api';
import { IAuthTwoFactorResponse, SecondLoginWSResponseCodes } from '../../../api/types';
import LoadingButton from '@mui/lab/LoadingButton';
import { AxiosResponse } from 'axios';

const isNumber = (str: string): boolean => {
    if (typeof str !== 'string') {
        return false;
    }

    if (str.trim() === '') {
        return false;
    }

    return !Number.isNaN(Number(str));
};

const useChangeHandler = () => {
    const [form, setForm] = useState({
        twoFactorCode: '',
    });

    const handleChange = (event: any, key: any) => {
        setForm((prev) => ({
            ...prev,
            [key]: event.target.value,
        }));
    };

    return { form, handleChange };
};

interface Props {
    onReturnToFirstLogin: () => void;
}

const SecondLogin: React.FC<Props> = ({ onReturnToFirstLogin }) => {
    const navigate = useNavigate();
    const { form, handleChange } = useChangeHandler();
    const dispatch = useAppDispatch();
    const dispatchAlert = useDispatchAlert();
    const [isLoading, setIsLoading] = useState(false);

    const currentUserName = useAppSelector(
        (state) => loginRootSelector(state).data.requests.firstLogin.currentUserName
    );
    const serverAuthToken = useAppSelector(
        (state) => loginRootSelector(state).data.requests.firstLogin.serverAuthToken
    );

    //When ServerSide is ready

    const onSecondLogin = async () => {
        let isCodeValid = validateCode();

        if (!isCodeValid) {
            dispatchAlert('error', AUTH_ERROR_MESSAGES.invalidTwoFactorCode, true);
        } else {
            try {
                setIsLoading(true);
                const res = await getTwoFactorLogin({
                    dbUrl: testUrl,
                    pinCode: form.twoFactorCode,
                    username: currentUserName,
                }).then((res) => {
                    setIsLoading(false);
                    console.log('res', res);
                    handleResponse(res);
                });
            } catch (error) {
                setIsLoading(false);
                dispatchAlert('error', AUTH_ERROR_MESSAGES.generalErrorMessage, true);
            }
        }
    };

    //remove any when server side ready

    const handleResponse = (res: AxiosResponse<IAuthTwoFactorResponse>) => {
        const { Ok, MissingParams, UserNameNotExist, TwoFactorAuthFailure, SqlError } = SecondLoginWSResponseCodes;

        if (res.data.response === Ok && res.data.data) {
            sessionStorage.setItem(AUTH_TOKEN_KEY, res.data.data);
            sessionStorage.setItem(AUTH_CURRENT_USER, currentUserName ? currentUserName : '');

            dispatch(setServerAuthTokenAction(res.data.data));

            dispatch(setIsLoggedInAction(true));

            navigate('/PermissionsHome');
        } else if (res.data.response === MissingParams) {
            dispatchAlert('error', AUTH_ERROR_MESSAGES.missingParameters, true);
        } else if (res.data.response === UserNameNotExist) {
            dispatchAlert('error', AUTH_ERROR_MESSAGES.userNotExist, true);
        } else if (res.data.response === TwoFactorAuthFailure) {
            dispatchAlert('error', AUTH_ERROR_MESSAGES.twoFactorAuthenticationFailure, true);
        } else if (res.data.response === SqlError) {
            dispatchAlert('error', AUTH_ERROR_MESSAGES.sqlError, true);
        } else {
            dispatchAlert('error', AUTH_ERROR_MESSAGES.generalErrorMessage, true);
        }
    };

    const validateCode = (): boolean => {
        if (form.twoFactorCode === '' || isNumber(form.twoFactorCode) === false) {
            return false;
        }
        return true;
    };

    return (
        <div
            style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexDirection: 'column',
                height: '80%',
            }}
        >
            <h1 style={{ paddingBottom: '40px' }}>התחברות</h1>
            <InnerContainer className="first-login-container">
                <h3 style={{ color: '#2196F3' }}>הזדהות עם קוד לדואר האלקטרוני</h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                    <TextField
                        size="small"
                        id="outlined-basic"
                        label="קוד אימות"
                        variant="outlined"
                        type={'text'}
                        dir={'rtl'}
                        value={form.twoFactorCode}
                        onChange={(e) => handleChange(e, 'twoFactorCode')}
                    ></TextField>

                    <div
                        style={{ display: 'flex', flexDirection: 'row', gap: '10px', justifyContent: 'space-between' }}
                    >
                        <Button
                            onClick={onReturnToFirstLogin}
                            style={{ width: '50%', backgroundColor: 'darkgray' }}
                            variant="contained"
                        >
                            חזור
                        </Button>
                        <LoadingButton
                            loading={isLoading}
                            onClick={onSecondLogin}
                            sx={{ backgroundColor: '#2196F3' }}
                            style={{ width: '50%' }}
                            variant="contained"
                        >
                            המשך
                        </LoadingButton>
                    </div>
                </div>
            </InnerContainer>
        </div>
    );
};

export default SecondLogin;
