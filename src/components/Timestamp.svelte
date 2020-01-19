<script>
  import { fade } from 'svelte/transition';
  export let connecting = true;
  export let timestamp = undefined;
  export let locale = undefined;
  const dateOptions = {
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  };
</script>

<style>
  .faded {
    opacity: 0.5;
  }
</style>

<div class="{connecting ? 'faded' : ''}" in:fade>
  {timestamp !== undefined ? new Date(timestamp).toLocaleDateString(locale, dateOptions) : ''}
</div>
