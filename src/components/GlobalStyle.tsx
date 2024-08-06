import { createGlobalStyle, css } from 'styled-components';

import { getHueForTemperature } from '../utils';

type Props = {
  temperature?: number;
};

export const GlobalStyle = createGlobalStyle<Props>(({ temperature }) => {
  const hue = getHueForTemperature(temperature);

  return css`
    body {
      background-color: hsl(${hue}, 67%, 30%);
      background-image: linear-gradient(
        to bottom,
        hsl(210, 67%, 30%) 0%,
        hsl(${hue}, 70%, 62%) 100%
      );
    }
  `;
});
