import styled from 'styled-components';

export const UserProfile = styled.div`
  width: 4rem;
  height: 4rem;
  background: ${props => {
    return `url(${props.profile_url})`;
  }};
  background-size: contain;
  border-radius: 50%;
`;

export const UserName = styled.div`
  text-align: center;
  color: #b8b7ad;
  font-size: 1.5rem;
  margin-top: 1rem;
  margin-bottom: 1rem;
  border-bottom: 3px solid #b8b7ad;
  padding: 0;
  padding-bottom: 0.5rem;
  width: 75%;
`;

export const IconTitle = styled.div`
  flex-grow: 1;
  margin-left: 1.5rem;
`;

export const FlexContainer = styled.div`
  display: flex !important;
  align-items: center;
  flex-direction: column;
`;
