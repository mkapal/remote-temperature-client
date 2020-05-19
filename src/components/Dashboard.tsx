import styled, { css } from 'styled-components';

type Props = {
  temperature?: number;
};

const getHue = (temperature: number) => {
  const minTemperature = -20;
  const maxTemperature = 40;

  const minHue = 270;
  const maxHue = 0;

  return (
    maxHue +
    ((minHue - maxHue) * (maxTemperature - temperature)) /
      (maxTemperature - minTemperature)
  );
};

export const Dashboard = styled.div<Props>(({ temperature }) => {
  const hue = temperature !== undefined ? getHue(temperature) : 210;

  return css`
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
    align-items: center;
    align-content: center;
    width: 100%;
    height: 100%;
    background: linear-gradient(
      to bottom,
      hsl(${hue}, 67%, 30%) 0%,
      hsl(${hue}, 69%, 45%) 50%,
      hsl(${hue}, 70%, 62%) 100%
    );
    color: #fff;
  `;
});
