import React from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './HeaderAuth.styles';

const HeaderAuth = () => {
    const navigate = useNavigate();

    const onLogoClick = () => {
        navigate('/PermissionsHome');
    };
    return (
        <styles.Container>
            <styles.Hr />
            <styles.TextContainer>
                <styles.Text onClick={onLogoClick}>System</styles.Text>
                <styles.Text onClick={onLogoClick} style={{ color: '#FFD42A' }}>
                    Permissions
                </styles.Text>
            </styles.TextContainer>
        </styles.Container>
    );
};

export default HeaderAuth;
