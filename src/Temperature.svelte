<script>
  export let temperature = undefined;
  $: temperatureText = temperature
    ? Number(temperature).toFixed(1) + ' °C'
    : '-';
</script>

<style>
  div {
    font-size: 50px;
    font-weight: bold;
    margin-bottom: 15px;
  }
</style>

<div>{temperatureText}</div>
