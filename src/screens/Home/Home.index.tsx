import React, { useState } from 'react';
import * as Styles from './Home.styled';
import { genV1, genV2 } from '../../utils/utils';
import styled, { CSSObject, css } from 'styled-components';
import DenseTable from './components/Table';

const Home: React.FC = (props: {}) => {
    return (
        <Styles.HomeContainer>
            <DenseTable />
        </Styles.HomeContainer>
    );
};

export default Home;
