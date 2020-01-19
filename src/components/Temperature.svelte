<script>
  import { fade } from 'svelte/transition';
  export let temperature = undefined;

  const formatTemperature = value => {
  	const fixedString = Number.parseFloat(value).toFixed();
  	return fixedString === "-0" ? "0" : fixedString + '°';
  };
</script>

<style>
  div {
    font-size: 30vw;
    font-weight: 300;
    margin-bottom: 15px;
  }
</style>

<div in:fade>
  {temperature !== undefined ? formatTemperature(temperature) : '-'}
</div>
