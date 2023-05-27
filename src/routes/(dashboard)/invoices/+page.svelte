<script>
  import { Search } from '$lib/components';
</script>

<svelte:head>
  <title>Invoices | The Dollar Hollar</title>
</svelte:head>

<div class="mb-16 flex items-center justify-between">
  <!-- Search Field -->
  <Search />

  <!-- New Invoice Button -->
  <button
    class="relative translate-y-0 whitespace-nowrap rounded-lg bg-lavenderIndigo px-10 py-3 text-xl font-bold text-white shadow-colored transition-all hover:-translate-y-2 hover:shadow-coloredHover"
    >+ Invoice</button
  >
</div>

<!-- List of Invoices -->
<div>
  <!-- Heading -->
  <div class="table-header invoice-table">
    <h3>Status</h3>
    <h3>Issue Date</h3>
    <h3>Id</h3>
    <h3>Client</h3>
    <h3>Amount</h3>
    <div />
    <div />
  </div>

  <!-- Invoices -->
  <div class="invoice-table">
    <div>draft</div>
    <div>9/7/2023</div>
    <div>1</div>
    <div>Someone</div>
    <div>$504</div>
    <div>View</div>
    <div>More</div>
  </div>
</div>

<style lang="postcss">
  .table-header h3 {
    @apply text-xl font-bold leading-snug text-daisyBush;
  }
</style>
