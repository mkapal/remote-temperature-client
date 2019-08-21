import Sockette from 'sockette';

const ws = new Sockette(process.env.WEBSOCKET_SERVER, {
  timeout: 5e3,
  maxAttempts: 10,
  onopen: () => console.log('Connected'),
  onmessage: e => {
    console.log('Message received');
    const data = JSON.parse(e.data);
    updateTemperature(data.temperature, data.timestamp);
  },
  onreconnect: () => console.log('Reconnecting...'),
  onmaximum: () => console.log('Stop Attempting'),
  onclose: () => console.log('Closed'),
  onerror: () => console.log('Error')
});

const updateTemperature = (temperature, timestamp) => {
  const temperatureText = temperature ? Number(temperature).toFixed(1) + ' °C' : '-';
  const dateOptions = {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  };
  const date = timestamp ? new Date(timestamp).toLocaleDateString(undefined, dateOptions) : '';
  document.getElementById('temperature').innerText = temperatureText;
  document.getElementById('date').innerText = date;
};
