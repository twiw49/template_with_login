import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'redux';
import axios from 'axios';
import * as Styled from './Styled';

const LandingPage = props => {
  const { dispatch } = props;

  const enterAsGuest = () => {
    dispatch({ type: 'ENTER_AS_GUEST' });
  };

  const loginBySocial = async (response, socialName) => {
    props.dispatch({
      type: 'START_LOADING'
    });

    const { data } = await axios.post('/auth/login', {
      _id: socialName === 'google' ? response.profile.id : response.profile.id,
      name: socialName === 'google' ? response.profile.name : response.profile.properties.nickname,
      profile_image:
        socialName === 'google' ? '' : response.profile.kakao_account.profile.profile_image_url
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
          <Styled.KakaoButton
            jsKey="cabb27a51ee75906fe9c7d604ed03cf2"
            onSuccess={response => loginBySocial(response, 'kakao')}
            onFailure={response => alert('다시 한 번 시도해주세요.')}
            getProfile="true"
          >
            카카오 로그인
          </Styled.KakaoButton>
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

export default compose(connect(state => ({ user: state.user })))(LandingPage);

// <Styled.SocialButton
//   provider="google"
//   appId="998435986623-vfi5erk0gi67c2ner255sst6r9p821j0.apps.googleusercontent.com"
//   onLoginSuccess={response => loginBySocial(response, 'google')}
//   onLoginFailure={response => alert('다시 한 번 시도해주세요.')}
// >
//   구글
// </Styled.SocialButton>;
