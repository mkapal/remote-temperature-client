import React, { FC } from 'react';
import styled from 'styled-components';

const formatTemperature = (value: number) => {
  const fixedString = value.toFixed();
  return (fixedString === '-0' ? '0' : fixedString) + '°';
};

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
