<script>
  import { CircledAmount, Search, Tag } from '$lib/components';
  import ThreeDots from '$lib/components/Icons/ThreeDots.svelte';
  import View from '$lib/components/Icons/View.svelte';
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
  <div class="invoice-table invoice-row rounded-lg bg-white py-2 shadow-tableRow md:py-4">
    <div class="status"><Tag className="ml-auto lg:ml-0" label="draft" /></div>
    <div class="due-date text-sm md:text-lg">9/7/2023</div>
    <div class="invoice-number text-sm md:text-lg">1</div>
    <div class="client-name text-base font-bold md:text-xl">Someone</div>
    <div class="amount text-right font-mono text-sm font-bold md:text-lg lg:text-left">$504</div>
    <div class="lg:center view-button hidden text-sm md:text-lg lg:block">
      <a href="/" class="text-pastelPurple hover:text-daisyBush"><View /></a>
    </div>
    <div class="lg:center more-button hidden text-sm md:text-lg lg:block">
      <button class="text-pastelPurple hover:text-daisyBush"><ThreeDots /></button>
    </div>
  </div>
</div>

<!-- Circled Amount / Total Amount -->
<CircledAmount label="Total" amount="1,440.00" />

<style lang="postcss">
  .table-header h3 {
    @apply text-xl font-bold leading-snug text-daisyBush;
  }

  .invoice-row {
    grid-template-areas: 'invoice-number invoice-number' 'client-name amount' 'due-date status';
  }

  @media (min-width: 1024px) {
    .invoice-row {
      grid-template-areas: 'status due-date invoice-number client-name amount view-button more-button';
    }
  }

  .status {
    grid-area: status;
  }
  .due-date {
    grid-area: due-date;
  }
  .invoice-number {
    grid-area: invoice-number;
  }
  .client-name {
    grid-area: client-name;
  }
  .amount {
    grid-area: amount;
  }
  .view-button {
    grid-area: view-button;
  }
  .more-button {
    grid-area: more-button;
  }
</style>
