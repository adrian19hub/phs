import { Button } from '@mui/material';
import React, { FC } from 'react';
import styled from 'styled-components';
import { colors } from '../../../styles/defaultTheme';

interface Props {
    rows: { [key: string]: string | number }[];
}

const StyledTable = styled.table`
    width: 100%;
    border-collapse: collapse;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.15);
`;

const StyledTh = styled.th`
    background-color: ${colors.blue};
    color: white;
    padding: 8px;
    text-align: left;
    border: 1px solid #ddd;
`;

const StyledTd = styled.td`
    border: 1px solid #ddd;
    padding: 8px;
    height: 32px;
`;

const StyledTr = styled.tr`
    &:nth-child(even) {
        background-color: #f2f2f2;
    }
`;

interface BlockedIpsTableProps extends Props {}
export const BlockedIpsTable: FC<BlockedIpsTableProps> = ({ rows }) => {
    return (
        <StyledTable>
            <thead>
                <tr>
                    {Object.keys(rows[0]).map((key) => (
                        <StyledTh key={key}>{key}</StyledTh>
                    ))}
                    <StyledTh>actions</StyledTh>
                </tr>
            </thead>
            <tbody>
                {rows.map((row, index) => (
                    <StyledTr key={index}>
                        {Object.values(row).map((value, index) => (
                            <StyledTd key={index}>{value}</StyledTd>
                        ))}
                        <StyledTd>
                            <Button
                                variant="outlined"
                                onClick={() => {
                                    alert('released');
                                }}
                            >
                                שחרר
                            </Button>
                        </StyledTd>
                    </StyledTr>
                ))}
            </tbody>
        </StyledTable>
    );
};

interface ReqHistoryTableProps extends Props {}
export const ReqHistoryTable: FC<ReqHistoryTableProps> = ({ rows }) => {
    return (
        <StyledTable>
            <thead>
                <tr>
                    {Object.keys(rows[0]).map((key) => (
                        <StyledTh key={key}>{key}</StyledTh>
                    ))}
                </tr>
            </thead>
            <tbody>
                {rows.map((row, index) => (
                    <StyledTr key={index}>
                        {Object.values(row).map((value, index) => (
                            <StyledTd key={index}>{value}</StyledTd>
                        ))}
                    </StyledTr>
                ))}
            </tbody>
        </StyledTable>
    );
};
