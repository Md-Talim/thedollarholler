<script lang="ts">
  import { clickOutside } from '$lib/actions/ClickOutside';
  import { swipe } from '$lib/actions/Swipe';
  import { AdditionalOptions, SlidePanel, Tag } from '$lib/components';
  import { Cancel, Edit, Send, ThreeDots, Trash, View } from '$lib/components/Icons';
  import { convertDateFormat, isLate } from '$lib/utils/dateHelpers';
  import { centsToDollars, invoiceTotal } from '$lib/utils/moneyHelpers';
  import ConfirmDelete from './ConfirmDelete.svelte';
  import InvoiceForm from './InvoiceForm.svelte';

  export let invoice: Invoice;
  let isAdditionalOptionsShowing: boolean = false;
  let isOptionsDisabled: boolean = false;
  let isModalShowing: boolean = false;
  let isInvoiceFormShowing: boolean = false;
  let triggerReset: boolean = false;

  const handleEdit = () => {
    isInvoiceFormShowing = true;
    isAdditionalOptionsShowing = false;
  };
  const handleDelete = () => {
    isModalShowing = true;
    isAdditionalOptionsShowing = false;
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

<div class="relative">
  <div
    class="invoice-table invoice-row relative z-row rounded-lg bg-white py-2 shadow-tableRow md:py-4"
    use:swipe={{ triggerReset }}
    on:outOfView={() => {
      triggerReset = false;
    }}
  >
    <div class="status"><Tag className="ml-auto lg:ml-0" label={getInvoiceLabel()} /></div>
    <div class="due-date text-sm md:text-lg">{convertDateFormat(invoice.dueDate)}</div>
    <div class="invoice-number text-sm md:text-lg">{invoice.invoiceNumber}</div>
    <div class="client-name truncate whitespace-nowrap text-base font-bold md:text-xl">
      {invoice.client.name}
    </div>
    <div class="amount text-right font-mono text-sm font-bold lg:text-lg">
      ${centsToDollars(invoiceTotal(invoice.lineItems, invoice.discount))}
    </div>
    <div class="view-button lg:center hidden text-sm md:text-lg">
      <a href={`/invoices/${invoice.id}`} class="text-pastelPurple hover:text-daisyBush"><View /></a
      >
    </div>
    <div
      class="more-button lg:center relative hidden text-sm md:text-lg"
      use:clickOutside={() => {
        isAdditionalOptionsShowing = false;
      }}
    >
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

  <!-- Swipe to reveal -->
  <div class="swipe-revealed-actions">
    <button
      class="action-button"
      on:click={() => {
        triggerReset = true;
      }}
    >
      <Cancel height={32} width={32} />
      Cancel
    </button>
    {#if !isOptionsDisabled}
      <button class="action-button" on:click={handleEdit}>
        <Edit height={32} width={32} />
        Edit
      </button>
      <button class="action-button" on:click={handleSendInvoice}>
        <Send height={32} width={32} />
        Send
      </button>
    {/if}
    <button class="action-button" on:click={handleDelete}>
      <Trash height={32} width={32} />
      Delete
    </button>
    <a href={`/invoices/${invoice.id}`} class="action-button">
      <View height={32} width={32} />
      View
    </a>
  </div>
</div>

<ConfirmDelete {invoice} {isModalShowing} on:close={() => (isModalShowing = false)} />

<!-- Slide Panel -->
{#if isInvoiceFormShowing}
  <SlidePanel on:close={() => (isInvoiceFormShowing = false)}>
    <InvoiceForm {invoice} formState="edit" closePanel={() => (isInvoiceFormShowing = false)} />
  </SlidePanel>
{/if}

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
