import { createGlobalStyle, css } from 'styled-components';

import { getHueForTemperature } from '../utils';

type Props = {
  temperature?: number;
};

export const GlobalStyle = createGlobalStyle<Props>(({ temperature }) => {
  const hue = getHueForTemperature(temperature);

  return css`
    body {
      background-color: #1e5799;
      background-image: linear-gradient(
        to bottom,
        #1e5799 0%,
        hsl(${hue}, 70%, 62%) 100%
      );
    }
  `;
});
