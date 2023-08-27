<script>
  import { CircledAmount, Search } from '$lib/components';
  import { invoices, loadInvoices } from '$lib/stores/InvoiceStore';
  import { onMount } from 'svelte';
  import InvoiceRow from './InvoiceRow.svelte';

  onMount(() => {
    loadInvoices();
    console.log($invoices);
  });
</script>

<svelte:head>
  <title>Invoices | The Dollar Hollar</title>
</svelte:head>

<div
  class="mb-8 flex flex-col-reverse items-start justify-between gap-y-4 md:flex-row md:items-center lg:mb-16"
>
  <!-- Search Field -->
  <Search />

  <!-- New Invoice Button -->
  <button
    class="lg-py-3 relative translate-y-0 whitespace-nowrap rounded-lg bg-lavenderIndigo px-5 py-2 text-xl font-bold text-white shadow-colored transition-all hover:-translate-y-2 hover:shadow-coloredHover lg:px-10"
    >+ Invoice</button
  >
</div>

<!-- List of Invoices -->
<div>
  <!-- Heading -->
  <div class="table-header invoice-table hidden lg:grid">
    <h3>Status</h3>
    <h3>Issue Date</h3>
    <h3>Id</h3>
    <h3>Client</h3>
    <h3>Amount</h3>
    <div />
    <div />
  </div>

  <!-- Invoices -->
  {#each $invoices as invoice}
    <InvoiceRow {invoice} />
  {/each}
</div>

<!-- Circled Amount / Total Amount -->
<CircledAmount label="Total" amount="1,440.00" />

<style lang="postcss">
  .table-header h3 {
    @apply text-xl font-bold leading-snug text-daisyBush;
  }
</style>
