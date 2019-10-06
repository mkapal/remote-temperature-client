<script context="module">
  import { translations } from 'svelte-intl';
  import en from './lang/en';
  import cs from './lang/cs';

  translations.update({
    en,
    cs,
  });
</script>

<script>
  import Sockette from 'sockette';
  import Dashboard from './components/Dashboard.svelte';

  let connecting = true;
  let error = false;
  let temperature;
  let timestamp;
  let historyData = [{ x: 0, y: 0 }];

  new Sockette(process.env.WEBSOCKET_SERVER, {
    timeout: 5000,
    maxAttempts: 10,
    onopen: () => {
      connecting = false;
      error = false;
      temperature = undefined;
      timestamp = undefined;
      console.info('Connected');
    },
    onmessage: event => {
      try {
        const data = JSON.parse(event.data);

        if (data.hasOwnProperty('temperature')) {
          temperature = data.temperature;
        }

        if (data.hasOwnProperty('timestamp')) {
          timestamp = data.timestamp;
        }

        if (
          data.hasOwnProperty('latestTemperatures') &&
          data.latestTemperatures.length > 0
        ) {
          historyData = data.latestTemperatures.map((val, idx) => ({
            x: idx + 1,
            y: val,
          }));
        }
      } catch (error) {
        console.warn('Could not parse received data:', event.data);
        console.error('Error:', error);
      }
    },
    onreconnect: () => {
      connecting = true;
      console.info('Reconnecting...');
    },
    onmaximum: () => {
      connecting = false;
      console.warn('Stop attempting');
    },
    onclose: () => {
      connecting = false;
      console.warn('Closed');
    },
    onerror: () => {
      connecting = false;
      error = true;
      console.error('Connection error');
    },
  });
</script>

<Dashboard {temperature} {timestamp} {connecting} {error} {historyData} />
