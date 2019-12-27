import React from 'react';
import styled from 'styled-components';

const Title = styled.h1`
  font-size: 2rem;
  text-align: center;
`;

const Button = styled.button`
  font-size: 1rem;
  padding: 1rem;
  background: transparent;
  border: 3px solid black;
  border-radius: 15px;
`;

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  align-items: center;
`;

const Home = props => {
  return (
    <Container>
      <a href="/auth/logout">
        <Button>LOGOUT</Button>
      </a>
      <Title>See You Soon!!</Title>
    </Container>
  );
};

export default Home;
