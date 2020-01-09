import { h, render } from 'https://unpkg.com/preact@latest?module';
import { useEffect, useState } from 'https://unpkg.com/preact@latest/hooks/dist/hooks.module.js?module';
import Sockette from 'https://unpkg.com/sockette@latest?module';

const App = () => {
  const [temperature, setTemperature] = useState(undefined);
  const [timestamp, setTimestamp] = useState(undefined);
  const [latestTemperatures, setLatestTemperatures] = useState([]);
  const [connecting, setConnecting] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    new Sockette('wss://p.lempls.com', {
      timeout: 1000,
      maxAttempts: 10,
      onopen: () => {
        setConnecting(false);
        setError(false);
        setTemperature(undefined);
        console.info('Connected');
      },
      onmessage: event => {
        try {
          const data = JSON.parse(event.data);

          if (data.hasOwnProperty('temperature')) {
            setTemperature(data.temperature);
          }

          if (data.hasOwnProperty('timestamp')) {
            setTimestamp(data.timestamp);
          }

          if (
            data.hasOwnProperty('latestTemperatures') &&
            data.latestTemperatures.length > 0
          ) {
            setLatestTemperatures(data.latestTemperatures.map((val, idx) => ({
              x: idx + 1,
              y: val,
            })));
          }
        } catch (error) {
          console.warn('Could not parse received data:', event.data);
          console.error('Error:', error);
        }
      },
      onreconnect: () => {
        setConnecting(true);
        console.info('Reconnecting...');
      },
      onmaximum: () => {
        setConnecting(false);
        console.warn('Stop attempting');
      },
      onclose: () => {
        setConnecting(false);
        console.warn('Closed');
      },
      onerror: () => {
        setConnecting(false);
        setError(true);
        console.error('Connection error');
      },
    });
  }, []);

  return h('p', {}, temperature);
};

render(
  h(App),
  document.getElementById('root'),
);
