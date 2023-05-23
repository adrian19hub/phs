import React, { useState } from 'react';
import * as Styles from './Home.styled';
import { genV1, genV2 } from '../../utils/utils';
import styled, { CSSObject, css } from 'styled-components';
import DenseTable from './components/Table';

const Home: React.FC = (props: {}) => {
    console.log('Home');
    return (
        <div>
            <DenseTable />
        </div>
    );
};

export default Home;
