<script lang="ts">
  import { Trash } from '$lib/components/Icons';
  import {
    centsToDollarsWithoutCommas,
    dollarsToCents,
    twoDecimals
  } from '$lib/utils/moneyHelpers';
  import { createEventDispatcher } from 'svelte';

  export let canDelete: boolean = false;
  export let lineItem: LineItem;
  export let isRequired: boolean;
  export let isEditable: boolean = true;
  const dispatch = createEventDispatcher();

  let unitPrice: string = centsToDollarsWithoutCommas(lineItem.amount / lineItem.quantity);
  let amount: string = centsToDollarsWithoutCommas(lineItem.amount);

  $: {
    amount = twoDecimals(lineItem.quantity * Number(unitPrice));
    lineItem.amount = dollarsToCents(Number(amount));
  }
</script>

<div class="invoice-line-item border-b-2 border-fog py-2">
  <div class="description">
    <label for="description" class="line-item-label">Description</label>
    <input
      class="line-item"
      type="text"
      name="description"
      bind:value={lineItem.description}
      required={isRequired}
      disabled={!isEditable}
    />
  </div>

  <div class="unitPrice">
    <label for="unitPrice" class="line-item-label text-right">Unit Price</label>
    <input
      class="line-item text-right"
      type="number"
      name="unitPrice"
      step="0.01"
      min="0"
      bind:value={unitPrice}
      on:blur={() => {
        unitPrice = twoDecimals(Number(unitPrice));
        dispatch('updateLineItems');
      }}
      required={isRequired}
      disabled={!isEditable}
    />
  </div>

  <div class="quantity">
    <label for="quantity" class="line-item-label text-center">Qty</label>
    <input
      class="line-item text-center"
      type="number"
      name="quantity"
      min="0"
      bind:value={lineItem.quantity}
      on:blur={() => {
        dispatch('updateLineItems');
      }}
      required={isRequired}
      disabled={!isEditable}
    />
  </div>

  <div class="amount">
    <label for="amount" class="line-item-label text-right">Amount</label>
    <input
      class="line-item text-right"
      type="number"
      name="amount"
      step="0.01"
      min="0"
      bind:value={amount}
      disabled
    />
  </div>

  <div class="trash">
    {#if canDelete && isEditable}
      <button
        class="center h-10 w-10 text-pastelPurple hover:text-lavenderIndigo"
        on:click|preventDefault={() => dispatch('removeLineItem', lineItem.id)}><Trash /></button
      >
    {/if}
  </div>
</div>

<style lang="postcss">
  input[type='text'],
  input[type='number'] {
    @apply h-10 w-full border-b-2 border-dashed border-stone-300;
  }

  input[type='text'] {
    @apply font-sansSerif text-xl font-bold;
  }

  input[type='number'] {
    @apply font-mono text-base;
  }

  input[type='text']:focus,
  input[type='number']:focus {
    @apply border-solid border-lavenderIndigo outline-none;
  }

  input[type='text']:disabled,
  input[type='number']:disabled {
    @apply border-b-0 bg-transparent px-0;
  }

  .line-item-label {
    @apply block print:hidden sm:hidden;
  }
</style>
