<script lang="ts">
  export let className = '';
</script>

<div class={`table-header invoice-table hidden lg:grid ${className}`}>
  <h3>Status</h3>
  <h3>Issue Date</h3>
  <h3>Id</h3>
  <h3>Client</h3>
  <h3 class="text-right">Amount</h3>
  <div />
  <div />
</div>

<style lang="postcss">
  .table-header h3 {
    @apply text-xl font-bold leading-snug;
  }
</style>
