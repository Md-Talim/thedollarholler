<script lang="ts">
  import { CircledAmount, Search } from '$lib/components';
  import Button from '$lib/components/Button.svelte';
  import { invoices, loadInvoices } from '$lib/stores/InvoiceStore';
  import { centsToDollars, sumInvoices } from '$lib/utils/moneyHelpers';
  import { onMount } from 'svelte';
  import BlankState from './BlankState.svelte';
  import InvoiceRow from './InvoiceRow.svelte';
  import InvoiceRowHeader from './InvoiceRowHeader.svelte';

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
  <Button label="+ Invoice" onClick={() => {}} />
</div>

<!-- List of Invoices -->
<div>
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
