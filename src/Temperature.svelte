<script>
  export let temperature = undefined;
</script>

<style>
  div {
    font-size: 30vw;
    font-weight: 300;
    margin-bottom: 15px;
  }
</style>

<div>{temperature ? Number(temperature).toFixed(0) + '°' : '-'}</div>
