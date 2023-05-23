import React, { useState } from 'react';
import * as Styles from './Home.styled';
import { genV1, genV2 } from '../../utils/utils';
import styled, { CSSObject, css } from 'styled-components';
import DenseTable from './components/Table';
import { BlockedIpsTable, ReqHistoryTable } from './components/VanillaTable';
import BasicTabs from './components/Tabs';
import MonitoringChart from './components/Chart';
import SimpleBottomNavigation from './components/BN';

const One = () => {
    return (
        <div style={{}}>
            <BlockedIpsTable
                rows={[
                    { ip: '193.123.12.1', date: '12/12/2020 13:35' },
                    { ip: '23.12.312.1', date: '12/12/2020 13:35' },
                    { ip: '2323.12.312.1', date: '12/12/2020 13:35' },
                    { ip: '243.12.312.1', date: '12/12/2020 13:35' },
                    { ip: '123.12.312.1', date: '12/12/2020 13:35' },
                ]}
            />
        </div>
    );
};
const Two = () => {
    return (
        <div>
            <ReqHistoryTable
                rows={[
                    { ip: '193.123.12.1', reqCount: 32 },
                    { ip: '23.12.312.1', reqCount: 32 },
                    { ip: '2323.12.312.1', reqCount: 32 },
                    { ip: '243.12.312.1', reqCount: 32 },
                    { ip: '213.12.312.1', reqCount: 32 },
                    { ip: '123.12.312.1', reqCount: 32 },
                ]}
            />
        </div>
    );
};

const Home: React.FC = (props: {}) => {
    const [currTab, setCurrTab] = useState(0);

    return (
        <div>
            <SimpleBottomNavigation setCurrTab={setCurrTab} currTab={currTab} />
            <div
                style={{
                    padding: '20px',
                }}
            >
                <div style={currTab === 0 ? {} : { display: 'none' }}>
                    <One />
                </div>
                <div style={currTab === 1 ? {} : { display: 'none' }}>
                    <Two />
                </div>
                <div style={currTab === 2 ? {} : { display: 'none' }}>
                    <MonitoringChart />
                </div>
            </div>
        </div>
    );
};

export default Home;
