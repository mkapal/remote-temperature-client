import styled, { keyframes } from 'styled-components';

const rotate = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`;

export const Loader = styled.div`
  border: 2px solid #fff;
  border-radius: 50%;
  border-top: 2px solid transparent;
  width: 24px;
  height: 24px;
  -webkit-animation: ${rotate} 0.5s linear infinite;
  animation: ${rotate} 0.5s linear infinite;
  margin: auto;
`;
