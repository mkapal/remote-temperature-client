<script>
  import Sockette from 'sockette';

  import Temperature from './Temperature.svelte';
  import Timestamp from './Timestamp.svelte';
  import LineGraph from './LineGraph.svelte';

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

        if (data.hasOwnProperty('latestTemperatures') && data.latestTemperatures.length > 0) {
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
      connecting = true;
      console.warn('Closed');
    },
    onerror: () => {
      connecting = false;
      error = true;
      console.error('Connection error');
    },
  });
</script>

<style>
  .appContainer {
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
    align-items: center;
    align-content: center;
    height: 100%;
    background: #1e5799; /* Old browsers */
    background: -moz-linear-gradient(
      top,
      #1e5799 0%,
      #2989d8 50%,
      #7db9e8 100%
    ); /* FF3.6-15 */
    background: -webkit-linear-gradient(
      top,
      #1e5799 0%,
      #2989d8 50%,
      #7db9e8 100%
    ); /* Chrome10-25,Safari5.1-6 */
    background: linear-gradient(
      to bottom,
      #1e5799 0%,
      #2989d8 50%,
      #7db9e8 100%
    ); /* W3C, IE10+, FF16+, Chrome26+, Opera12+, Safari7+ */
    filter: progid:DXImageTransform.Microsoft.gradient( startColorstr='#1e5799', endColorstr='#7db9e8',GradientType=0 ); /* IE6-9 */
    color: #fff;
  }
</style>

<div class="appContainer">
  {#if error && !connecting}
    <p>Při načítání se vyskytla chyba.</p>
  {:else if connecting || temperature === undefined}
    <div>
      <img src="spinner.svg" alt="Loading" />
      <p>{connecting ? 'Připojování' : 'Čekání'}</p>
    </div>
  {:else}
    <div>
      <Temperature {temperature} />
      <Timestamp {timestamp} />
    </div>
    <LineGraph
      points={historyData}
      yTicks={[-20, 0, 20, 40]}
      xTicks={[1, 25, 50, 75, 100]} />
  {/if}

</div>
