<script lang="ts">
  import { Tag } from '$lib/components';
  import ThreeDots from '$lib/components/Icons/ThreeDots.svelte';
  import View from '$lib/components/Icons/View.svelte';
  import { centsToDollars, sumLineItems } from '$lib/utils/moneyHelpers';
  import type { Invoice } from '../../../global';

  export let invoice: Invoice;
</script>

<div class="invoice-table invoice-row rounded-lg bg-white py-2 shadow-tableRow md:py-4">
  <div class="status"><Tag className="ml-auto lg:ml-0" label={invoice.invoiceStatus} /></div>
  <div class="due-date text-sm md:text-lg">{invoice.dueDate}</div>
  <div class="invoice-number text-sm md:text-lg">{invoice.invoiceNumber}</div>
  <div class="client-name truncate whitespace-nowrap text-base font-bold md:text-xl">
    {invoice.client.name}
  </div>
  <div class="amount text-right font-mono text-sm font-bold lg:text-lg">
    ${centsToDollars(sumLineItems(invoice.lineItems))}
  </div>
  <div class="lg:center view-button hidden text-sm md:text-lg lg:block">
    <a href="/" class="text-pastelPurple hover:text-daisyBush"><View /></a>
  </div>
  <div class="lg:center more-button hidden text-sm md:text-lg lg:block">
    <button class="text-pastelPurple hover:text-daisyBush"><ThreeDots /></button>
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
