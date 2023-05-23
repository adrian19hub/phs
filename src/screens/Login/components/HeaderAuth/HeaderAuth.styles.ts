import styled from 'styled-components';

const Container = styled.div`
    width: 100%;
    height: 8vh;
    background: #f9f8f8;
    box-shadow: 0px 10px 20px rgba(0, 0, 0, 0.16);
    display: flex;
    flex-direction: column;
`;

const TextContainer = styled.div`
    display: flex;
    flex-direction: row-reverse;
    justify-content: center;
    align-items: center;
    height: 100%;
`;

const Text = styled.p<{
    color?: string;
}>`
    font-style: normal;
    font-weight: normal;
    font-size: 36px;
    line-height: 100%;
    color: black;
    margin: 0 10px 0 0;
    cursor: pointer;
`;

const Hr = styled.div`
    align-self: flex-start;
    width: 100%;
    height: 6px;
    background-color: #2196F3;
`;

export default { Container, Text, Hr, TextContainer };
