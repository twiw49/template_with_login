import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'redux';
import axios from 'axios';
import styled from 'styled-components';
import KakaoLogin from 'react-kakao-login';
import introImage from '../../assets/images/background1.svg';

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  align-items: flex-end;
  background: url(${introImage});
  background-size: contain;
  background-position: center;
  background-repeat: no-repeat;
`;

const KakaoButton = styled(KakaoLogin)`
  cursor: pointer;
  width: 8rem;
  height: 2.5rem;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 1rem;
  border-radius: 5px;
  font-size: 1rem;
  background: #ffeb00;
  color: #783c00;
  border: 0;
`;

const LandingPage = props => {
  const loginBySocial = async (response, socialName) => {
    props.dispatch({
      type: 'START_LOADING'
    });

    const { data } = await axios.post('/auth/login', {
      id: socialName === 'google' ? response.profile.id : response.profile.id,
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
    <Container>
      <title>로그인</title>
      <KakaoButton
        jsKey="cabb27a51ee75906fe9c7d604ed03cf2"
        onSuccess={response => loginBySocial(response, 'kakao')}
        onFailure={response => alert('다시 한 번 시도해주세요.')}
        getProfile="true"
      >
        카카오 로그인
      </KakaoButton>
    </Container>
  );
};

LandingPage.propTypes = {
  dispatch: PropTypes.func.isRequired
};

export default compose(connect(state => ({ user: state.user })))(LandingPage);

// import ReactSocialLogin from 'react-social-login';

// const StyledButton = styled.div`
//   cursor: pointer;
//   width: 8rem;
//   height: 2.3rem;
//   display: flex;
//   justify-content: center;
//   align-items: center;
//   margin: 0.4rem;
//   border-radius: 5px;
//   color: white;
//   font-size: 1rem;
//   background: ${props => {
//     if (props.title === '구글') return 'rgb(219, 50, 54)';
//     return '#333';
//   }};
// `;

// const Button = ({ children, triggerLogin }) => (
//   <StyledButton onClick={triggerLogin} title={children}>
//     {children}
//   </StyledButton>
// );

// Button.propTypes = {
//   children: PropTypes.any.isRequired,
//   triggerLogin: PropTypes.func.isRequired
// };

// const SocialButton = ReactSocialLogin(Button);

// <SocialButton
//   provider="google"
//   appId="998435986623-vfi5erk0gi67c2ner255sst6r9p821j0.apps.googleusercontent.com"
//   onLoginSuccess={response => loginBySocial(response, 'google')}
//   onLoginFailure={response => alert('다시 한 번 시도해주세요.')}
// >
//   구글
// </SocialButton>;
