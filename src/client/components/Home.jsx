import React from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import DialogButton from './DialogButton';
import AddHabit from './AddHabit';

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  align-items: center;
`;

const Home = props => (
  <Container>
    <DialogButton Content={() => <AddHabit />} title="+" dialogTitle="새로운 습관추가하기" />
  </Container>
);

export default connect()(Home);
