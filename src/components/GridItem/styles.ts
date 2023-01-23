import styled from "styled-components";

type containerProps ={
    ShowBackground: boolean;
}

export const container = styled.div<containerProps>`
   background-color: ${props => props.ShowBackground  ? '#1550FF' : '#E2E3E3'};
   height: 100px;
   border-radius: 20px;
   display: flex;
   align-items: center;
   justify-content: center;
   cursor: pointer;
`

type iconProps = {
    opacity?: number;
}

export const Icon = styled.img<iconProps>`
width: 40px;
height: 40px;
opacity: ${props => props.opacity ?? 1}
`