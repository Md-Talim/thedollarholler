<script>
  import { CircledAmount, Search } from '$lib/components';
  import { invoices, loadInvoices } from '$lib/stores/InvoiceStore';
  import { centsToDollars, sumInvoices } from '$lib/utils/moneyHelpers';
  import { onMount } from 'svelte';
  import BlankState from './BlankState.svelte';
  import InvoiceRow from './InvoiceRow.svelte';
  import InvoiceRowHeader from './InvoiceRowHeader.svelte';
  import Portal from '$lib/components/Portal.svelte';

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
  {#if $invoices.length > 0}
    <Search />
  {:else}
    <div />
  {/if}

  <!-- New Invoice Button -->
  <button
    class="lg-py-3 relative translate-y-0 whitespace-nowrap rounded-lg bg-lavenderIndigo px-5 py-2 text-xl font-bold text-white shadow-colored transition-all hover:-translate-y-2 hover:shadow-coloredHover lg:px-10"
    >+ Invoice</button
  >
</div>

<!-- List of Invoices -->
<div>
  <Portal><div>Invoice Form</div></Portal>

  {#if $invoices === null}
    Loading...
  {:else if $invoices.length <= 0}
    <BlankState />
  {:else}
    <!-- Heading -->
    <InvoiceRowHeader className="text-daisyBush" />
    <!-- Invoices -->
    <div class="flex flex-col-reverse">
      {#each $invoices as invoice}
        <InvoiceRow {invoice} />
      {/each}
    </div>
    <!-- Circled Amount / Total Amount -->
    <CircledAmount label="Total" amount={`${centsToDollars(sumInvoices($invoices))}`} />
  {/if}
</div>
