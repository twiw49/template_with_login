import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import * as Styled from './Styled';

const LandingPage = props => {
  const { dispatch } = props;

  const enterAsGuest = () => {
    dispatch({ type: 'ENTER_AS_GUEST' });
  };

  const loginBySocial = async response => {
    props.dispatch({
      type: 'START_LOADING'
    });

    const { data } = await axios.post('/auth/login', {
      _id: response.profile.id,
      name: response.profile.name
    });

    props.dispatch({
      type: 'LOGIN',
      payload: {
        ...data
      }
    });

    props.dispatch({
      type: 'END_LOADING'
    });
  };

  return (
    <Styled.Container>
      <title>로그인</title>
      <Styled.SubContainerStart>
        <Fragment>
          <Styled.SocialButton
            provider="google"
            appId="998435986623-vfi5erk0gi67c2ner255sst6r9p821j0.apps.googleusercontent.com"
            onLoginSuccess={response => loginBySocial(response)}
            onLoginFailure={response => alert('다시 한 번 시도해주세요.')}
          >
            구글
          </Styled.SocialButton>
          <Styled.GuestButton to="/" onClick={enterAsGuest}>
            둘러보기
          </Styled.GuestButton>
        </Fragment>
      </Styled.SubContainerStart>
    </Styled.Container>
  );
};

LandingPage.propTypes = {
  dispatch: PropTypes.func.isRequired
};

export default LandingPage;
