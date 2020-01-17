import React from 'react';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import { connect } from 'react-redux';
import styled from 'styled-components';
import withPopupMenu from '../HOCs/withPopupMenu';
import withAlert from '../HOCs/withAlert';
import HabitCard from './HabitCard';

const Container = styled.div`
  position: absolute;
  top: 4rem;
  width: 100vw;
  height: calc(100vh - 4rem);
  display: flex;
  flex-direction: column;
  overflow: scroll;
`;

const Home = ({ habits }) => (
  <Container>
    {habits.map(habit => (
      <HabitCard habit={habit} key={habit.id} />
    ))}
  </Container>
);

Home.propTypes = {
  habits: PropTypes.array.isRequired
};

export default compose(
  connect(state => ({
    habits: state.user.habits
  })),
  withPopupMenu,
  withAlert
)(Home);
