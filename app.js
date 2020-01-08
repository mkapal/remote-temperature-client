import { h, render } from 'https://unpkg.com/preact@latest?module';
import { useEffect, useState } from 'https://unpkg.com/preact@latest/hooks/dist/hooks.module.js?module';
import Sockette from 'https://unpkg.com/sockette@latest?module';

const App = () => {
  const [temperature, setTemperature] = useState(undefined);

  useEffect(() => {
    new Sockette('wss://p.lempls.com', {
      timeout: 1000,
      maxAttempts: 10,
      onopen: () => {
        console.info('Connected');
      },
      onmessage: event => {
        const data = JSON.parse(event.data);

        if (data.hasOwnProperty('temperature')) {
          setTemperature(data.temperature);
        }
      },
      onreconnect: () => {
        console.info('Reconnecting...');
      },
      onmaximum: () => {
        console.warn('Stop attempting');
      },
      onclose: () => {
        console.warn('Closed');
      },
      onerror: () => {
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
