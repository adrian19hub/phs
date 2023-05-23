import React from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './SecondaryNavbar.styles';
import LogoutIcon from '@mui/icons-material/Logout';
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';
import { Tooltip } from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import { AUTH_CURRENT_USER, AUTH_TOKEN_KEY } from '../../../../Routing/Routing';
import { useAppDispatch } from '../../../../store/hooks';
import {
    setIsFirstLoginStatusAction,
    setServerAuthTokenAction,
    setIsLoggedInAction,
} from '../../../../store/slices/loginSlice';

const SecondaryNavbar = () => {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();

    const currentUserName = sessionStorage.getItem(AUTH_CURRENT_USER);

    const logout = () => {
        dispatch(setIsFirstLoginStatusAction(false));
        dispatch(setServerAuthTokenAction(null));
        sessionStorage.removeItem(AUTH_CURRENT_USER);
        sessionStorage.removeItem(AUTH_TOKEN_KEY);
        dispatch(setIsLoggedInAction(false));
        navigate('/');
    };

    const onHome = () => {
        navigate('/PermissionsHome');
    };

    return (
        <styles.Container>
            <HomeIcon onClick={onHome} style={{ cursor: 'pointer', marginLeft: '10px' }} />
            <div style={{ display: 'flex', gap: '10px', marginRight: '10px' }}>
                <LogoutIcon onClick={logout} style={{ cursor: 'pointer' }} />
                <span>שלום, {currentUserName} </span>
            </div>
        </styles.Container>
    );
};

export default SecondaryNavbar;
