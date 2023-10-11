<script lang="ts">
  import { Button, CircledAmount, Search, SlidePanel } from '$lib/components';
  import { invoices, loadInvoices } from '$lib/stores/InvoiceStore';
  import { centsToDollars, sumInvoices } from '$lib/utils/moneyHelpers';
  import { onMount } from 'svelte';
  import BlankState from './BlankState.svelte';
  import InvoiceForm from './InvoiceForm.svelte';
  import InvoiceRow from './InvoiceRow.svelte';
  import InvoiceRowHeader from './InvoiceRowHeader.svelte';

  let isInvoiceFormShowing: boolean = false;

  onMount(() => {
    loadInvoices();
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
  <Button
    label="+ Invoice"
    onClick={() => {
      isInvoiceFormShowing = true;
    }}
  />
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

<!-- Slide Panel -->
{#if isInvoiceFormShowing}
  <SlidePanel on:close={() => (isInvoiceFormShowing = false)}>
    <InvoiceForm closePanel={() => (isInvoiceFormShowing = false)} />
  </SlidePanel>
{/if}
