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
      console.log('Connected');
    },
    onmessage: e => {
      const data = JSON.parse(e.data);
      temperature = data.temperature;
      timestamp = data.timestamp;

      if (data.latestTemperatures && data.latestTemperatures.length > 0) {
        historyData = data.latestTemperatures.map((val, idx) => ({
          x: idx + 1,
          y: val,
        }));
      }

      console.log('Message received', data);
    },
    onreconnect: () => {
      connecting = true;
      console.log('Reconnecting...');
    },
    onmaximum: () => {
      connecting = false;
      console.log('Stop Attempting');
    },
    onclose: () => {
      connecting = true;
      console.log('Closed');
    },
    onerror: () => {
      connecting = false;
      error = true;
      console.log('Error');
    },
  });
</script>

<style>
  .appContainer {
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
    align-items: center;
    height: 100%;
    background-color: #3f8eb6;
    color: #fff;
  }
</style>

<div class="appContainer">
  {#if error && !connecting}
    <p>Při načítání se vyskytla chyba.</p>
  {:else if connecting || !temperature}
    <img src="spinner.svg" alt="Loading" />
    {connecting ? 'Připojování' : 'Čekání'}
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
