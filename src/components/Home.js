import React from "react"
import styled from "styled-components"
import Boards from "./Boards"

export const Container = styled.div`
    position: relative;
    width: 1 vw;
    display: flex;
    flex-direction: row;
    flex-wrap: nowrap;
    justify-content: center;
`

export const ContainerLeft = styled.div`
    position: relative;
    width: 26%;
    max-width: 280px;
    display: inline-box;
`

export const ContainerRight = styled.div`
    position: relative;
    width: 90%;
    // width: 64%;
    // max-width: 825px;
    display: inline-box;
`

const Home = () => {
    return (
        <Container>
            <ContainerRight>
                <Boards />
            </ContainerRight>
        </Container>
    )
}

export default Home
