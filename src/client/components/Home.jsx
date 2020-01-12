import React from 'react';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import { connect } from 'react-redux';
import styled from 'styled-components';
import withPopupMenu from '../HOCs/withPopupMenu';
import HabitCard from './HabitCard';

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  padding-top: 4rem;
  display: flex;
  flex-direction: column;
`;

const Home = ({ user: { habits } }) => (
  <Container>
    {habits.map(habit => (
      <HabitCard {...habit} key={habit.id} />
    ))}
  </Container>
);

Home.propTypes = {
  user: PropTypes.object.isRequired
};

export default compose(
  connect(state => ({
    user: state.user
  })),
  withPopupMenu
)(Home);
