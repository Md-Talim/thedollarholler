<script lang="ts">
  import { AdditionalOptions, Tag } from '$lib/components';
  import ThreeDots from '$lib/components/Icons/ThreeDots.svelte';
  import View from '$lib/components/Icons/View.svelte';
  import Edit from '$lib/components/Icons/Edit.svelte';
  import Trash from '$lib/components/Icons/Trash.svelte';
  import Send from '$lib/components/Icons/Send.svelte';
  import { convertDateFormat, isLate } from '$lib/utils/dateHelpers';
  import { centsToDollars, sumLineItems } from '$lib/utils/moneyHelpers';
  import type { Invoice } from '../../../global';

  export let invoice: Invoice;
  let isAdditionalOptionsShowing = false;
  let isOptionsDisabled = false;

  const handleEdit = () => {
    console.log('editing...');
  };
  const handleDelete = () => {
    console.log('deleting...');
  };
  const handleSendInvoice = () => {
    console.log('sending...');
  };

  const getInvoiceLabel = () => {
    if (invoice.invoiceStatus === 'draft') {
      return 'draft';
    } else if (invoice.invoiceStatus === 'sent' && !isLate(invoice.dueDate)) {
      isOptionsDisabled = true;
      return 'sent';
    } else if (invoice.invoiceStatus === 'sent' && isLate(invoice.dueDate)) {
      isOptionsDisabled = true;
      return 'late';
    } else if (invoice.invoiceStatus === 'paid') {
      isOptionsDisabled = true;
      return 'paid';
    }
  };
</script>

<div class="invoice-table invoice-row rounded-lg bg-white py-2 shadow-tableRow md:py-4">
  <div class="status"><Tag className="ml-auto lg:ml-0" label={getInvoiceLabel()} /></div>
  <div class="due-date text-sm md:text-lg">{convertDateFormat(invoice.dueDate)}</div>
  <div class="invoice-number text-sm md:text-lg">{invoice.invoiceNumber}</div>
  <div class="client-name truncate whitespace-nowrap text-base font-bold md:text-xl">
    {invoice.client.name}
  </div>
  <div class="amount text-right font-mono text-sm font-bold lg:text-lg">
    ${centsToDollars(sumLineItems(invoice.lineItems))}
  </div>
  <div class="view-button lg:center hidden text-sm md:text-lg">
    <a href="/" class="text-pastelPurple hover:text-daisyBush"><View /></a>
  </div>
  <div class="more-button lg:center relative hidden text-sm md:text-lg">
    <button
      class="text-pastelPurple hover:text-daisyBush"
      on:click={() => {
        isAdditionalOptionsShowing = !isAdditionalOptionsShowing;
      }}
    >
      <ThreeDots />
    </button>
    {#if isAdditionalOptionsShowing}
      <AdditionalOptions
        options={[
          { text: 'Edit', icon: Edit, onClick: handleEdit, disabled: isOptionsDisabled },
          { text: 'Delete', icon: Trash, onClick: handleDelete, disabled: false },
          { text: 'Send', icon: Send, onClick: handleSendInvoice, disabled: isOptionsDisabled }
        ]}
      />
    {/if}
  </div>
</div>

<style lang="postcss">
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
