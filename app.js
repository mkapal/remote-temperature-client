import { h, render } from 'https://unpkg.com/preact@latest?module';
import { useEffect, useState } from 'https://unpkg.com/preact@latest/hooks/dist/hooks.module.js?module';
import Sockette from 'https://unpkg.com/sockette@latest?module';

const App = () => {
  const [connecting, setConnecting] = useState(true);
  const [error, setError] = useState(false);
  const [temperature, setTemperature] = useState(undefined);
  const [timestamp, setTimestamp] = useState(undefined);
  const [latestTemperatures, setLatestTemperatures] = useState([]);

  useEffect(() => {
    new Sockette('wss://p.lempls.com', {
      timeout: 1000,
      maxAttempts: 10,
      onopen: () => {
        setConnecting(false);
        setError(false);
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

  if (error && !connecting) {
    return h('p', {}, 'Error while loading data');
  }

  if (connecting || temperature === undefined || timestamp === undefined) {
    return h('div', {}, [
      h('img', {
        src: 'spinner.svg',
        alt: 'Loading',
      }),
      h('p', {}, connecting ? 'Connecting' : 'Waiting'),
    ]);
  }

  const formattedTemperature = Number(temperature).toFixed(0) + '°';
  const dateOptions = {
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  };
  const formattedTimestamp = new Date(timestamp).toLocaleDateString(undefined, dateOptions);

  return h('div', {}, [
    h('div', {
      class: 'Temperature',
    }, formattedTemperature),
    h('div', {}, formattedTimestamp)
  ]);
};

render(
  h(App),
  document.getElementById('root'),
);
