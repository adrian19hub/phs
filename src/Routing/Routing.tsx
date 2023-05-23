import React, { useEffect } from 'react';
import { useNavigate, createBrowserRouter, RouterProvider } from 'react-router-dom';
import { useAppSelector, useAppDispatch } from '../store/hooks';
import { loginRootSelector, setServerAuthTokenAction } from '../store/slices/loginSlice';
import Home from '../screens/Home/Home.index';
import Login from '../screens/Login/Login';
import styled from 'styled-components';

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

const IndexContainer = styled.div`
    display: flex;
    flex-direction: column;
    padding: 20px;
    width: 350px;
    height: ${window.screen.height * 0.98}px;
    background-color: #cdcdcd;
`;

function Routing() {
    const authFromSessions = sessionStorage.getItem(AUTH_TOKEN_KEY);
    const isLoggedIn = useAppSelector((state) => loginRootSelector(state).data.requests.isLoggedIn);

    const dispatch = useAppDispatch();

    if (authFromSessions) {
        dispatch(setServerAuthTokenAction(authFromSessions));
    }

    return (
        <IndexContainer>
            <RouterProvider router={router} />
        </IndexContainer>
    );
}

export default Routing;
