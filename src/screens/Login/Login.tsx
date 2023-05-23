import FirstLogin from './components/FirstLogin';
import SecondLogin from './components/SecondLogin';
import { useAppSelector, useAppDispatch } from '../../store/hooks';
import loginSlice, {
    loginRootSelector,
    setIsFirstLoginStatusAction,
    setServerAuthTokenAction,
} from '../../store/slices/loginSlice';
import styled from 'styled-components';
import { colors } from '../../styles/defaultTheme';

export const Container = styled.div`
    display: flex;
    flex-direction: column;
    width: 100vw;
    height: 100vh;
    background-color: ${colors.lightBlue};
`;

const Login = () => {
    const dispatch = useAppDispatch();
    const firstLoginStatus = useAppSelector((state) => loginRootSelector(state).data.requests.firstLogin.status);

    const onReturnToFirstLogin = () => {
        dispatch(setIsFirstLoginStatusAction(false));
        dispatch(setServerAuthTokenAction(null));
    };

    return (
        <Container>
            {!firstLoginStatus && <FirstLogin />}
            {firstLoginStatus && <SecondLogin onReturnToFirstLogin={onReturnToFirstLogin} />}
        </Container>
    );
};

export default Login;
