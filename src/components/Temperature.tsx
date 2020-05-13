import React, { FC } from 'react';
import styled from 'styled-components';

import { formatTemperature } from '../utils';

type Props = {
  value: number;
};

const Temp = styled.div`
  font-size: 30vw;
  font-weight: 300;
  margin-bottom: 15px;
`;

export const Temperature: FC<Props> = ({ value }) => (
  <Temp>{formatTemperature(value)}</Temp>
);
