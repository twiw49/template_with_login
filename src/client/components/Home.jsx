import React from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import DialogButton from './DialogButton';
import AddHabit from './AddHabit';

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
      <DialogButton Content={() => <AddHabit />} title="+" dialogTitle="새로운 습관 추가하기" />
      <a href="/auth/logout">
        <Button>LOGOUT</Button>
      </a>
      <Title>See You Soon!!</Title>
    </Container>
  );
};

export default connect()(Home);
