import { Login } from '@mui/icons-material';
import { Container, Alert } from '@mui/material';
import React, { useEffect } from 'react';
import { useNavigate, createBrowserRouter, RouterProvider } from 'react-router-dom';
import useAlert from '../hooks/useAlert';
import { useAppSelector, useAppDispatch } from '../store/hooks';
import { loginRootSelector, setServerAuthTokenAction } from '../store/slices/loginSlice';
import Home from '../screens/Home/Home.index';

export const DEV_AUTH_PATH = 'http://localhost:3000/';

export const RESET_PASSWORD_ROUTE = `${DEV_AUTH_PATH}ResetPassword/`;

export const AUTH_TOKEN_KEY = 'authToken';
export const AUTH_CURRENT_USER = 'userName';

const NavAuth: React.FC<{}> = () => {
    const serverAuthToken = useAppSelector(
        (state) => loginRootSelector(state).data.requests.firstLogin.serverAuthToken
    );
    const navigate = useNavigate();

    useEffect(() => {
        if (
            (!serverAuthToken &&
                window.location.href !== DEV_AUTH_PATH &&
                !window.location.href.includes(RESET_PASSWORD_ROUTE)) ||
            window.location.href === RESET_PASSWORD_ROUTE
        ) {
            console.log('here');
            navigate('/');
        }
    }, [window.location.href, serverAuthToken]);

    return null;
};

const router = createBrowserRouter([
    {
        path: '/',
        element: <Home />,
    },
    {
        path: '/login',
        element: <Login />,
    },
]);

function Routing() {
    const alertConfig = useAlert();
    const authFromSessions = sessionStorage.getItem(AUTH_TOKEN_KEY);
    const isLoggedIn = useAppSelector((state) => loginRootSelector(state).data.requests.isLoggedIn);

    const dispatch = useAppDispatch();

    if (authFromSessions) {
        dispatch(setServerAuthTokenAction(authFromSessions));
    }

    return (
        <>
            <Container>
                <NavAuth />
                <RouterProvider router={router} />
                <Alert {...alertConfig.props}>{alertConfig.message}</Alert>
            </Container>
        </>
    );
}

export default Routing;
