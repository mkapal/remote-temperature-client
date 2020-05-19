export const formatTemperature = (value: number) => {
  const fixedString = value.toFixed();
  return (fixedString === '-0' ? '0' : fixedString) + '°';
};

export const formatTimestamp = (timestamp?: string) => {
  if (!timestamp) {
    return '';
  }

  return new Date(timestamp).toLocaleDateString(undefined, {
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
};

export const getHueForTemperature = (temperature?: number): number => {
  if (temperature === undefined) {
    return 210;
  }

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
