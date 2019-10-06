<script>
  import { fade } from 'svelte/transition';
  export let temperature = undefined;
</script>

<style>
  div {
    font-size: 30vw;
    font-weight: 300;
    margin-bottom: 15px;
  }
</style>

<div in:fade>
  {temperature !== undefined ? Number(temperature).toFixed(0) + '°' : '-'}
</div>
