import styled from "styled-components";
import Bg from "./Bg";
import Center from "./Center";

const Wrapper = styled.div`
    margin-top:50px;
`

export default function Footer(){
    return(
        <Wrapper>
            <Bg>
                <Center>
                © Copyright 2023, I-SEE. All Rights Reserved.
                </Center>
            </Bg>
        </Wrapper>
    )
}