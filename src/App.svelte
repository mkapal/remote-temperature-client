<script>
  import Sockette from 'sockette';
  import Temperature from './Temperature.svelte';
  import Timestamp from './Timestamp.svelte';

  let isLoading = true;
  let temperature = 42.57;
  let timestamp = new Date();

  new Sockette('ws://localhost:3000', {
    timeout: 5000,
    maxAttempts: 10,
    onopen: () => {
      console.log('Connected');
      // isLoading = false;
    },
    onmessage: e => {
      console.log('Message received');
      const data = JSON.parse(e.data);
      temperature = data.temperature;
      timestamp = data.timestamp;
    },
    onreconnect: () => console.log('Reconnecting...'),
    onmaximum: () => console.log('Stop Attempting'),
    onclose: () => console.log('Closed'),
    onerror: () => console.log('Error'),
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
  {#if isLoading}
      <img src="spinner.svg" alt="Loading tempereature" />
  {:else}
  <Temperature {temperature} />
  <Timestamp {timestamp} />
  {/if}

</div>
