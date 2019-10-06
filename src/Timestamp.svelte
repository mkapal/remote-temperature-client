<script>
  export let timestamp = undefined;
  export let locale = undefined;
  const dateOptions = {
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  };
</script>

<div>
  {timestamp !== undefined ? new Date(timestamp).toLocaleDateString(locale, dateOptions) : ''}
</div>
