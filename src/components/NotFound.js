import React from "react";
import styled from 'styled-components';

const Container = styled.div`
position: relative;
width: 100%;
height: 100%;
text-align: center;
`

const Title = styled.div`
margin-top: 200px;
color: #706b6b;
font-size: 4rem;

`

const Content = styled.div`
margin-top: 50px;
font-size: 1.2rem;
text-align: left;
display: inline-box;
max-width: 500px;
`

const NotFound = () => {
    return (
        <Container>
            <Title>Page not found</Title>
            <Content>
                The link you entered does not look like a valid link. If someone gave you this link, you may need to ask them to check that it's correct.
            </Content>
        </Container>
    )
}
export default NotFound