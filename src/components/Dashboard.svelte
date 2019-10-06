<script>
  import { getBrowserLocale } from 'svelte-intl';
  import { _ } from 'svelte-intl';

  import Temperature from './Temperature.svelte';
  import Timestamp from './Timestamp.svelte';
  import LineGraph from './LineGraph.svelte';

  export let temperature;
  export let timestamp;
  export let connecting = true;
  export let error = false;
  export let historyData = [{ x: 0, y: 0 }];

  const userLocale = getBrowserLocale('cs');
</script>

<style>
  .dashboard {
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

<div class="dashboard">
  {#if error && !connecting}
    <p>{$_('loading.error')}</p>
  {:else if connecting || temperature === undefined}
    <div>
      <img src="spinner.svg" alt="Loading" />
      <p>{connecting ? $_('connecting') : $_('waiting')}</p>
    </div>
  {:else}
    <div>
      <Temperature {temperature} />
      <Timestamp {timestamp} locale={userLocale} />
    </div>
    <LineGraph
      points={historyData}
      yTicks={[-20, 0, 20, 40]}
      xTicks={[1, 25, 50, 75, 100]} />
  {/if}
</div>
