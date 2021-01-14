import styled from '@emotion/styled';

export const FlexSection = styled.section`
    width: 90%;
    margin: 20px auto;
    display: flex;
    justify-content: space-around;
    flex-wrap: wrap;
`

export const Button = styled.button`
    height: 25px;
    width: 80%;
    margin: 2px 0;
    border-radius: 5px;
    border: none;
    background: ${props => 
        props.delete ? '#ef476f' : '#06d6a0'}
`