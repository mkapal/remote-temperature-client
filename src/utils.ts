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
