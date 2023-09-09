<script lang="ts">
  import { AdditionalOptions, Button, Modal, Tag } from '$lib/components';
  import { Edit, Send, ThreeDots, Trash, View } from '$lib/components/Icons';
  import { deleteInvoice } from '$lib/stores/InvoiceStore';
  import { convertDateFormat, isLate } from '$lib/utils/dateHelpers';
  import { centsToDollars, sumLineItems } from '$lib/utils/moneyHelpers';

  export let invoice: Invoice;
  let isAdditionalOptionsShowing = false;
  let isOptionsDisabled = false;
  let isModalShowing: boolean = false;

  const amount = centsToDollars(sumLineItems(invoice.lineItems));

  const handleEdit = () => {
    console.log('editing...');
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

<div class="invoice-table invoice-row rounded-lg bg-white py-2 shadow-tableRow md:py-4">
  <div class="status"><Tag className="ml-auto lg:ml-0" label={getInvoiceLabel()} /></div>
  <div class="due-date text-sm md:text-lg">{convertDateFormat(invoice.dueDate)}</div>
  <div class="invoice-number text-sm md:text-lg">{invoice.invoiceNumber}</div>
  <div class="client-name truncate whitespace-nowrap text-base font-bold md:text-xl">
    {invoice.client.name}
  </div>
  <div class="amount text-right font-mono text-sm font-bold lg:text-lg">
    ${amount}
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

<Modal isVisible={isModalShowing} on:close={() => (isModalShowing = false)}>
  <div class="flex h-full min-h-[175px] flex-col justify-between">
    <p class="text-center text-xl font-bold text-daisyBush">
      Are you sure you want to delete this invoice to <span class="text-scarlet"
        >{invoice.client.name}</span
      >
      for
      <span class="text-scarlet">${amount}</span>?
    </p>
    <div class="flex gap-4">
      <Button
        label="Cancel"
        isAnimated={false}
        onClick={() => {
          isModalShowing = false;
        }}
        style="secondary"
      />
      <Button
        label="Yes, Delete It"
        isAnimated={false}
        onClick={() => {
          deleteInvoice(invoice);
          isModalShowing = false;
        }}
        style="destructive"
      />
    </div>
  </div>
</Modal>

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
