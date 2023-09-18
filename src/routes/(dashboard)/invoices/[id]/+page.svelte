<script lang="ts">
  import Button from '$lib/components/Button.svelte';
  import { convertDateFormat } from '$lib/utils/dateHelpers';
  import LineItemRows from '../LineItemRows.svelte';

  export let data: { invoice: Invoice };
  const { invoice } = data;

  const printInvoice = () => {
    console.log('Print Invoice.');
  };
  const copyLink = () => {
    console.log('Copy Invoice.');
  };
  const sendInvoice = () => {
    console.log('Send Invoice.');
  };
  const payInvoice = () => {
    console.log('Pay Invoice');
  };
</script>

<div class="fixed z-0 flex w-full max-w-screen-lg justify-between">
  <h1 class="text-3xl font-bold text-daisyBush">Invoice</h1>
  <div class="flex items-center gap-4">
    <Button
      height="short"
      label="Print"
      onClick={printInvoice}
      style="outline"
      isAnimated={false}
    />
    <Button height="short" label="Copy Link" onClick={copyLink} />
    <Button height="short" label="Send" onClick={sendInvoice} />
    <Button height="short" label="Pay Invoice" onClick={payInvoice} />
  </div>
</div>

<div
  class="relative top-32 z-10 grid grid-cols-6 gap-x-5 gap-y-8 bg-white px-16 py-32 shadow-invoice"
>
  <div class="col-span-3">
    <img
      src="/images/logo.png"
      srcset="/images/logo@2x.png 2x, /images/logo.png 1x"
      alt="Compressed.fm"
    />
  </div>

  <div class="col-span-2 col-start-5 pt-4">
    <div class="label">From</div>
    <p>
      Amy Dutton<br />
      123 Awesome Street<br />
      Coolville TN 54321
    </p>
  </div>

  <div class="col-span-3">
    <div class="label">Bill To:</div>
    <p>
      <strong>{invoice.client.name}</strong><br />
      {invoice.client.email}<br />
      {invoice.client.street}<br />
      {invoice.client.city}, {invoice.client.state}
      {invoice.client.zip}
    </p>
  </div>

  <div class="col-span-2 col-start-5">
    <div class="label">Invoice Id</div>
    <p>{invoice.invoiceNumber}</p>
  </div>

  <div class="col-span-3">
    <div class="label">Due Date</div>
    <p>{convertDateFormat(invoice.dueDate)}</p>
  </div>

  <div class="col-span-2 col-start-5">
    <div class="label">Issue Date</div>
    <p>{convertDateFormat(invoice.issueDate)}</p>
  </div>

  <div class="col-span-6">
    <div class="label">Subject</div>
    <p>{invoice.subject}</p>
  </div>

  <div class="col-span-6">
    <LineItemRows
      lineItems={invoice.lineItems}
      isEditable={false}
      discount={invoice?.discount || 0}
    />
  </div>

  {#if invoice.notes}
    <div class="col-span-6">
      <div class="label">Notes</div>
      <p>{invoice.notes}</p>
    </div>
  {/if}

  {#if invoice.terms}
    <div class="col-span-6">
      <div class="label">Terms & Coditions</div>
      <p>{invoice.terms}</p>
    </div>
  {/if}
</div>

<style lang="postcss">
  .label {
    @apply font-black text-monsoon;
  }
</style>
