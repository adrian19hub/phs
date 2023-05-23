import React, { useState } from 'react';
import { TextField } from '@mui/material';
import styled from 'styled-components';
import { AxiosResponse } from 'axios';
import { WSResetPasswordByMail, getGeneralLogin } from '../../../api/api';
import { testUrl } from '../../../api/index';
import {
    IAuthWSResponse,
    IResetPasswordByMailResponse,
    LoginWSResponseCodes,
    ResetPasswordByMailResponseCodes,
} from '../../../api/types';
import {
    loginRootSelector,
    setCurrentUserNameAction,
    setIsFirstLoginStatusAction,
    setServerAuthTokenAction,
} from '../../../store/slices/loginSlice';
import { useAppDispatch, useAppSelector } from '../../../store/hooks';
import { LoadingButton } from '@mui/lab';
import { RESET_PASSWORD_ROUTE } from '../../../Routing/Routing';
import { AUTH_ERROR_MESSAGES } from '../../../constants/errorMessages';
import { useDispatchAlert } from '../../../hooks/useAlert';

export const InnerContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 610px;
    height: 412px;
    border: solid 1px lightgray;
    border-radius: 4px;
    background-color: ${colors.white};
    box-shadow: 0px 0px 20px rgba(0, 0, 0, 0.1);
`;

export const loginContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    height: '80%';
`;

const useChangeHandler = () => {
    const [form, setForm] = useState({
        userName: '',
        password: '',
    });

    const handleChange = (event: any, key: any) => {
        setForm((prev) => ({
            ...prev,
            [key]: event.target.value,
        }));
    };

    return { form, handleChange };
};

interface Props {}
const FirstLogin: React.FC<Props> = () => {
    const [isLoading, setIsLoading] = useState(false);

    const dispatch = useAppDispatch();

    const dispatchAlert = useDispatchAlert();

    const onFirstLogin = async () => {
        try {
            setIsLoading(true);

            const res = await getGeneralLogin({
                dbUrl: testUrl,
                userName: form.userName,
                password: form.password,
            }).then((res) => {
                console.log('res', res);
                setIsLoading(false);
                handleResponse(res);
            });
        } catch (error) {
            setIsLoading(false);
            dispatchAlert('error', AUTH_ERROR_MESSAGES.generalErrorMessage, true);
        }
    };

    const onResetPassword = async () => {
        try {
            const res = await WSResetPasswordByMail({
                dbUrl: testUrl,
                url: RESET_PASSWORD_ROUTE,
                userName: form.userName,
            });

            handleResetPasswordResponse(res);
        } catch (error) {
            dispatchAlert('error', AUTH_ERROR_MESSAGES.generalErrorMessage, true);
        }
    };

    const handleResetPasswordResponse = (res: AxiosResponse<IResetPasswordByMailResponse>) => {
        const { Ok, userNameEmpty, UserNameNotExist, MissingMail, SqlError } = ResetPasswordByMailResponseCodes;

        if (res.data.response === Ok) {
            dispatchAlert('success', AUTH_ERROR_MESSAGES.resetPasswordMailSent, true);
        } else if (res.data.response === userNameEmpty) {
            dispatchAlert('error', AUTH_ERROR_MESSAGES.resetPasswordUsernameEmpty, true);
        } else if (res.data.response === UserNameNotExist) {
            dispatchAlert('error', AUTH_ERROR_MESSAGES.userNotExist, true);
        } else if (res.data.response === MissingMail) {
            dispatchAlert('error', AUTH_ERROR_MESSAGES.resetPasswordMissingMail, true);
        } else if (res.data.response === SqlError) {
            dispatchAlert('error', AUTH_ERROR_MESSAGES.sqlError, true);
        }
    };

    const handleResponse = (res: AxiosResponse<IAuthWSResponse>) => {
        const { Ok, WrongPassword, UserNameNotExist, MailMissing, UserNameNotValid } = LoginWSResponseCodes;

        if (res.data.response === Ok) {
            dispatch(setCurrentUserNameAction(form.userName));
            dispatch(setIsFirstLoginStatusAction(true));
        } else if (res.data.response === UserNameNotExist) {
            dispatchAlert('error', AUTH_ERROR_MESSAGES.userNotExist, true);
        } else if (res.data.response === WrongPassword) {
            dispatchAlert('error', AUTH_ERROR_MESSAGES.wrongPassword, true);
        } else if (res.data.response === MailMissing) {
            dispatchAlert('error', AUTH_ERROR_MESSAGES.missingEmail, true);
        } else {
            dispatchAlert('error', AUTH_ERROR_MESSAGES.generalErrorMessage, true);
        }
    };

    const { form, handleChange } = useChangeHandler();

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
            <h1 style={{ marginBottom: '40px' }}>התחברות</h1>
            <InnerContainer className="first-login-container">
                <div style={{ display: 'flex', flexDirection: 'row' }}>
                    <h3 style={{ fontSize: '18px', marginBottom: '30px' }}>הזן שם משתמש וסיסמא</h3>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
                    <TextField
                        dir="rtl"
                        size="small"
                        id="outlined-basic"
                        label="שם משתמש"
                        variant="outlined"
                        type={'text'}
                        value={form.userName}
                        onChange={(e) => handleChange(e, 'userName')}
                    ></TextField>
                    <TextField
                        dir="rtl"
                        size="small"
                        id="outlined-basic"
                        label="סיסמא"
                        variant="outlined"
                        type={'password'}
                        value={form.password}
                        onChange={(e) => handleChange(e, 'password')}
                    ></TextField>
                    <div
                        onClick={onResetPassword}
                        style={{ fontSize: '12px', margin: '0px', color: 'blue', cursor: 'pointer' }}
                    >
                        שכחתי סיסמה
                    </div>
                    <LoadingButton
                        loading={isLoading}
                        sx={{ backgroundColor: '#2196F3' }}
                        onClick={onFirstLogin}
                        variant="contained"
                    >
                        התחבר
                    </LoadingButton>
                </div>
            </InnerContainer>
        </div>
    );
};

export default FirstLogin;
