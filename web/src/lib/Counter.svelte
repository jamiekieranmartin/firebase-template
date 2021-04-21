<script lang="ts">
  let count: number = 1;

  const increment = () => {
    count += 1;
  };
</script>

<button on:click={increment}>
  Clicks: {count}
</button>

<style style lang="postcss">
  button {
    font-family: inherit;
    font-size: inherit;
    font-variant-numeric: tabular-nums;
  }
</style>
