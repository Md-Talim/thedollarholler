<script>
  import { Search } from '$lib/components';
  import ThreeDots from '$lib/components/Icons/ThreeDots.svelte';
  import View from '$lib/components/Icons/View.svelte';
  import Tag from '$lib/components/Tag.svelte';
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
  <div class="invoice-table rounded-lg bg-white py-4 shadow-tableRow">
    <div><Tag label="draft" /></div>
    <div class="text-lg">9/7/2023</div>
    <div class="text-lg">1</div>
    <div class="text-xl font-bold">Someone</div>
    <div class="font-mono text-lg font-bold">$504</div>
    <div class="center text-lg">
      <a href="/" class="text-pastelPurple hover:text-daisyBush"><View /></a>
    </div>
    <div class="center text-lg">
      <button class="text-pastelPurple hover:text-daisyBush"><ThreeDots /></button>
    </div>
  </div>
</div>

<style lang="postcss">
  .table-header h3 {
    @apply text-xl font-bold leading-snug text-daisyBush;
  }
</style>
