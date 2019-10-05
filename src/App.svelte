<script>
  import Sockette from 'sockette';
  import Temperature from './Temperature.svelte';
  import Timestamp from './Timestamp.svelte';

  let connecting = true;
  let error = false;
  let temperature;
  let timestamp;

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
      connecting = false;
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
    justify-content: center;
    align-items: center;
    height: 100%;
  }
</style>

<div class="appContainer">
  {#if error && !connecting}
    <p>Při načítání se vyskytla chyba.</p>
  {:else if connecting || !temperature}
    <img src="spinner.svg" alt="Loading" />
    {connecting ? 'Připojování' : 'Čekání'}
  {:else}
    <Temperature {temperature} />
    <Timestamp {timestamp} />
  {/if}

</div>
