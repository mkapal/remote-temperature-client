<script>
  export let timestamp = undefined;
  const dateOptions = {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  };

  $: formattedTimestamp =
    timestamp !== undefined
      ? new Date(timestamp).toLocaleDateString('cs', dateOptions)
      : '-';
</script>

<div>{formattedTimestamp}</div>
