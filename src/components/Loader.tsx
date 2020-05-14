import { IconProp } from '@fortawesome/fontawesome-svg-core';
import {
  faMobileAlt,
  faServer,
  faThermometerHalf,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { FC } from 'react';
import styled, { css, keyframes } from 'styled-components';

const Wrapper = styled.div`
  display: flex;
  margin: auto;
  align-items: center;
`;

const fade = keyframes`
  0% {
    transform: scale(0.3);
  }
  30% {
    transform: scale(0.3);
  }
  50% {
    transform: scale(1);
  }
  70% {
    transform: scale(0.3);
  }
  100% {
    transform: scale(0.3);
  }
`;

const ConnectingDot = styled.div<{
  active?: boolean;
  delay?: number;
  duration?: number;
}>(
  ({ active, delay = 0, duration = 1 }) => css`
    width: 3px;
    height: 3px;
    background-color: white;
    margin: 4px;
    transform: scale(0.3);
    animation: ${fade} ${duration}s linear infinite;
    animation-delay: ${delay}s;
    ${!active && 'animation: none'};
  `,
);

const ConnectingLine: FC<{
  active?: boolean;
  dotCount: number;
  speed: number;
  direction?: 'left' | 'right';
}> = ({ active, dotCount, speed = 10, direction = 'right' }) => {
  const delayFactor = 1 / speed;
  const duration = delayFactor * dotCount;

  let dots = Array(dotCount)
    .fill(null)
    .map((_, idx) => (
      <ConnectingDot
        key={idx}
        active={active}
        duration={duration}
        delay={delayFactor * (idx + 1) - duration}
      />
    ));

  if (direction === 'left') {
    dots.reverse();
  }

  return <>{dots}</>;
};

const Icon: FC<{ active?: boolean; icon: IconProp }> = ({ active, icon }) => {
  const opacity = active ? 1 : 0.5;
  return <FontAwesomeIcon icon={icon} size="3x" opacity={opacity} />;
};

type Props = {
  connecting: boolean;
  waiting: boolean;
};

export const Loader: FC<Props> = ({ connecting, waiting }) => (
  <>
    <Wrapper>
      <Icon icon={faMobileAlt} active />
      <ConnectingLine dotCount={5} speed={10} active={connecting} />
      <Icon icon={faServer} active={waiting} />
      <ConnectingLine
        dotCount={5}
        speed={10}
        active={waiting}
        direction="left"
      />
      <Icon icon={faThermometerHalf} />
    </Wrapper>
    <p>{connecting ? 'Připojování' : 'Čekání'}</p>
  </>
);
