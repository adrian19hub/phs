import styled from 'styled-components';

const Container = styled.div`
    width: 100%;
    background: #f7f7f79c;
    font-size: large;
    box-shadow: 0px 10px 20px rgba(0, 0, 0, 0.16);
    display: flex;
    height: 3.5vh;
    justify-content: space-between;
    align-items: center;
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


export default { Container, Text, TextContainer };
