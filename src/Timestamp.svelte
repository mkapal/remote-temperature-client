<script>
  export let timestamp = undefined;
  const dateOptions = {
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  };
</script>

<div>{timestamp !== undefined ? new Date(timestamp).toLocaleDateString(undefined, dateOptions) : ''}</div>
