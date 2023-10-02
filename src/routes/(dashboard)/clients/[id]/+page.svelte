<script lang="ts">
  import { Button, CircledAmount, Search, SlidePanel } from '$lib/components';
  import { Edit } from '$lib/components/Icons';
  import { isLate } from '$lib/utils/dateHelpers';
  import { centsToDollars, sumInvoices } from '$lib/utils/moneyHelpers';
  import BlankState from '../../invoices/BlankState.svelte';
  import InvoiceRow from '../../invoices/InvoiceRow.svelte';
  import InvoiceRowHeader from '../../invoices/InvoiceRowHeader.svelte';
  import ClientForm from '../ClientForm.svelte';

  export let data: { client: Client };

  let isClientFormShowing: boolean = false;
  let isEditingClient: boolean = false;

  const editClient = () => {
    isClientFormShowing = true;
    isEditingClient = true;
  };

  const closePanel = () => {
    isClientFormShowing = false;
    isEditingClient = false;
  };

  const getDraft = (): string => {
    const draftInvoices = data.client.invoices.filter(
      (invoice) => invoice.invoiceStatus === 'draft'
    );

    return centsToDollars(sumInvoices(draftInvoices));
  };

  const getPaid = (): string => {
    const paidInvoices = data.client.invoices.filter((invoice) => invoice.invoiceStatus === 'paid');

    return centsToDollars(sumInvoices(paidInvoices));
  };

  const getTotalOverdue = (): string => {
    const unpaidInvoices = data.client.invoices.filter(
      (invoice) => invoice.invoiceStatus === 'sent' && isLate(invoice.dueDate)
    );

    return centsToDollars(sumInvoices(unpaidInvoices));
  };

  const getTotalOutstanding = (): string => {
    const unpaidInvoices = data.client.invoices.filter(
      (invoice) => invoice.invoiceStatus === 'sent' && !isLate(invoice.dueDate)
    );

    return centsToDollars(sumInvoices(unpaidInvoices));
  };
</script>

<svelte:head>
  <title>Client | The Dollar Hollar</title>
</svelte:head>

<div
  class="mb-8 flex flex-col-reverse items-start justify-between gap-y-4 md:flex-row md:items-center lg:mb-16"
>
  <!-- Search Field -->
  {#if data.client.invoices.length > 0}
    <Search />
  {:else}
    <div />
  {/if}

  <!-- New Client Button -->
  <Button label="+ Client" onClick={() => (isClientFormShowing = true)} />
</div>

<div class="mb-7 flex justify-between">
  <h1 class="font-sansSerif text-3xl font-bold text-daisyBush">{data.client.name}</h1>
  <Button label="Edit" leftIcon={Edit} onClick={editClient} style="textOnly" isAnimated={false} />
</div>

<!-- Summary -->
<div
  class="mb-10 grid grid-cols-1 gap-4 rounded-lg bg-gallery px-10 py-7 md:grid-cols-2 lg:grid-cols-4"
>
  <div class="summary-block">
    <div class="label">Total Overdue</div>
    <div class="number"><sup>$</sup>{getTotalOverdue()}</div>
  </div>
  <div class="summary-block">
    <div class="label">Total Outstanding</div>
    <div class="number"><sup>$</sup>{getTotalOutstanding()}</div>
  </div>
  <div class="summary-block">
    <div class="label">Total Draft</div>
    <div class="number"><sup>$</sup>{getDraft()}</div>
  </div>
  <div class="summary-block">
    <div class="label">Total Paid</div>
    <div class="number"><sup>$</sup>{getPaid()}</div>
  </div>
</div>

<!-- List of Invoices -->
<div>
  {#if data.client.invoices === null}
    Loading...
  {:else if data.client.invoices.length <= 0}
    <BlankState />
  {:else}
    <!-- Heading -->
    <InvoiceRowHeader className="text-daisyBush" />
    <!-- Invoices -->
    <div class="flex flex-col-reverse">
      {#each data.client.invoices as invoice}
        <InvoiceRow {invoice} />
      {/each}
    </div>
    <!-- Circled Amount / Total Amount -->
    <CircledAmount label="Total" amount={`${centsToDollars(sumInvoices(data.client.invoices))}`} />
  {/if}
</div>

<!-- Slide Panel -->
{#if isClientFormShowing}
  <SlidePanel on:close={closePanel}>
    <ClientForm
      {closePanel}
      client={isEditingClient ? data.client : undefined}
      formState={isEditingClient ? 'edit' : 'create'}
    />
  </SlidePanel>
{/if}

<style lang="postcss">
  .summary-block {
    @apply text-center;
  }

  .label {
    @apply text-sm font-black text-[#A397AD];
  }

  .number {
    @apply truncate text-[2.5rem] font-black text-purple;
  }
</style>
