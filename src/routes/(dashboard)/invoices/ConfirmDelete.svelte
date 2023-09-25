<script lang="ts">
  import { Button, Modal } from '$lib/components';
  import { deleteInvoice } from '$lib/stores/InvoiceStore';
  import { snackbar } from '$lib/stores/SnackbarStore';
  import { centsToDollars, sumLineItems } from '$lib/utils/moneyHelpers';
  import { createEventDispatcher } from 'svelte';

  export let isModalShowing: boolean = false;
  export let invoice: Invoice;
  const dispatch = createEventDispatcher();
</script>

<Modal isVisible={isModalShowing} on:close>
  <div class="flex h-full min-h-[175px] flex-col justify-between">
    <p class="text-center text-xl font-bold text-daisyBush">
      Are you sure you want to delete this invoice to <span class="text-scarlet"
        >{invoice.client.name}</span
      >
      for
      <span class="text-scarlet">
        ${centsToDollars(sumLineItems(invoice.lineItems))}
      </span>?
    </p>
    <div class="flex gap-4">
      <Button
        label="Cancel"
        isAnimated={false}
        onClick={() => {
          dispatch('close');
        }}
        style="secondary"
      />
      <Button
        label="Yes, Delete It"
        isAnimated={false}
        onClick={() => {
          deleteInvoice(invoice);
          snackbar.send({
            message: 'Your invoice has been deleted.',
            type: 'success'
          });
          dispatch('close');
        }}
        style="destructive"
      />
    </div>
  </div>
</Modal>
