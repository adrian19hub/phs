import styled from 'styled-components'

const HomeContainer = styled.div`
    display: flex;
    flex-direction: column;
    padding: 20px;
    width: 350px;
    height: ${window.screen.height * 0.98}px;
    background-color: #cdcdcd;
`;

const Input = styled.input`
    width: 250px;
`

const Button = styled.button`
    width: 100px;
`



export {
    HomeContainer,
    Input,
    Button
}