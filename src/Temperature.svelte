<script>
  export let temperature = undefined;
  $: temperatureText = temperature
    ? Number(temperature).toFixed(1) + '°'
    : '-';
</script>

<style>
  div {
    font-size: 20vw;
    margin-bottom: 15px;
  }
</style>

<div>{temperatureText}</div>
