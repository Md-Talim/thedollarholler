<script lang="ts">
  import Button from '$lib/components/Button.svelte';
  import { convertDateFormat } from '$lib/utils/dateHelpers';
  import LineItemRows from '../LineItemRows.svelte';
  import { settings, loadSettings } from '$lib/stores/SettingsStore';
  import SvelteMarkdown from 'svelte-markdown';
  import { page } from '$app/stores';

  export let data: { invoice: Invoice };
  const { invoice } = data;
  let copyLinkLable = 'Copy Link';

  const printInvoice = () => {
    window.print();
  };
  const copyLink = () => {
    navigator.clipboard.writeText($page.url.href);
    copyLinkLable = 'Copied!';

    setTimeout(() => {
      copyLinkLable = 'Copy Link';
    }, 1250);
  };
  const sendInvoice = () => {
    console.log('Send Invoice.');
  };
  const payInvoice = () => {
    console.log('Pay Invoice');
  };

  $: loadSettings();
</script>

<div
  class="fixed z-0 flex w-full max-w-screen-lg flex-col justify-between gap-y-5 px-4 print:hidden md:flex-row"
>
  <h1 class="text-3xl font-bold text-daisyBush">Invoice</h1>
  <div class="flex flex-wrap items-center gap-2 sm:gap-4">
    <Button
      height="short"
      label="Print"
      onClick={printInvoice}
      style="outline"
      isAnimated={false}
    />
    <Button
      height="short"
      label={copyLinkLable}
      onClick={copyLink}
      className="min-w-[100px] sm:min-w-[168px] justify-center"
    />
    <Button height="short" label="Send" onClick={sendInvoice} />
    <Button height="short" label="Pay Invoice" onClick={payInvoice} />
  </div>
</div>

<div
  class="print:shadown-none relative top-32 z-10 grid grid-cols-6 gap-x-5 gap-y-8 bg-white px-4 py-8 shadow-invoice print:top-0 md:px-16 md:py-32"
>
  <div class="col-span-6 print:col-span-3 sm:col-span-3">
    <img
      src="/images/logo.png"
      srcset="/images/logo@2x.png 2x, /images/logo.png 1x"
      alt="Compressed.fm"
    />
  </div>

  <div class="col-span-6 pt-4 print:col-span-3 sm:col-span-2 sm:col-start-5">
    {#if $settings && $settings.myName}
      <div class="label">From</div>
      <p>
        {$settings.myName}<br />
        {$settings.email}<br />
        {$settings.street}<br />
        {$settings.city}, {$settings.state}
        {$settings.zip}
      </p>
    {:else}
      <div class="center min-h-[68px] rounded-lg bg-gallery">
        <a href="/" class="text-stone-600 underline hover:no-underline">
          Add your contact information
        </a>
      </div>
    {/if}
  </div>

  <div class="col-span-6 print:col-span-3 sm:col-span-3">
    <div class="label">Bill To:</div>
    <p>
      <strong>{invoice.client.name}</strong><br />
      {invoice.client.email}<br />
      {invoice.client.street}<br />
      {invoice.client.city}, {invoice.client.state}
      {invoice.client.zip}
    </p>
  </div>

  <div class="col-span-6 sm:col-span-2 sm:col-start-5">
    <div class="label">Invoice Id</div>
    <p>{invoice.invoiceNumber}</p>
  </div>

  <div class="col-span-3">
    <div class="label">Due Date</div>
    <p>{convertDateFormat(invoice.dueDate)}</p>
  </div>

  <div class="col-span-3 sm:col-span-2 sm:col-start-5">
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
      <SvelteMarkdown source={invoice.notes} />
    </div>
  {/if}

  {#if invoice.terms}
    <div class="col-span-6">
      <div class="label">Terms & Coditions</div>
      <SvelteMarkdown source={invoice.terms} />
    </div>
  {/if}
</div>

<style lang="postcss">
  .label {
    @apply font-black text-monsoon;
  }
</style>
