import styled from "styled-components";

const StyledDiv = styled.div`
    background-color: #222; 
    color: #fff;
    padding: 50px 0;
`

export default function Bg({children}){
    return(
        <StyledDiv>
            {children}
        </StyledDiv>
    )
}