<script lang="ts">
  import { Button } from '$lib/components';
  import { Trash } from '$lib/components/Icons';
  import { addInvoice, updateInvoice } from '$lib/stores/InvoiceStore';
  import { snackbar } from '$lib/stores/SnackbarStore';
  import { addClient, clients, loadClients } from '$lib/stores/ClientStore';
  import { today } from '$lib/utils/dateHelpers';
  import states from '$lib/utils/states';
  import { onMount } from 'svelte';
  import { slide } from 'svelte/transition';
  import { v4 as uuidv4 } from 'uuid';
  import ConfirmDelete from './ConfirmDelete.svelte';
  import LineItemRows from './LineItemRows.svelte';

  export let closePanel: () => void = () => {};

  const blankLineItem = {
    id: uuidv4(),
    description: '',
    quantity: 0,
    amount: 0
  };

  let isModalShowing: boolean = false;
  let isNewClient: boolean = false;
  export let formState: 'create' | 'edit' = 'create';
  export let invoice: Invoice = {
    client: {} as Client,
    lineItems: [{ ...blankLineItem }] as LineItem[]
  } as Invoice;
  let newClient: Partial<Client> = {};

  const UpdateDiscount = (event: CustomEvent) => {
    invoice.discount = event.detail.discount;
  };

  const AddLineItem = () => {
    invoice.lineItems = [...(invoice.lineItems as []), { ...blankLineItem, id: uuidv4() }];
  };

  const RemoveLineItem = (event: CustomEvent<string>) => {
    invoice.lineItems =
      invoice?.lineItems && invoice.lineItems.filter((item) => item.id !== event.detail);
  };

  const UpdateLineItems = () => {
    invoice.lineItems = invoice.lineItems;
  };

  const handleSubmit = () => {
    if (isNewClient) {
      invoice.client = newClient as Client;
      addClient(newClient as Client);
    }

    if (formState === 'create') {
      addInvoice(invoice);
      snackbar.send({
        message: 'Your invoice has been created.',
        type: 'success'
      });
    } else {
      updateInvoice(invoice);
      snackbar.send({
        message: 'Your invoice has been updated.',
        type: 'success'
      });
    }

    closePanel();
  };

  onMount(() => {
    loadClients();
  });
</script>

<h2 class="mb-7 font-sansSerif text-3xl font-bold text-daisyBush">
  {#if formState === 'create'} Add {:else} Edit {/if} an Invoice
</h2>

<form class="grid grid-cols-6 gap-x-5" on:submit|preventDefault={handleSubmit}>
  <!-- Client -->
  <div class="field col-span-6 md:col-span-4">
    {#if !isNewClient}
      <label for="client">Client</label>
      <div class="flex flex-wrap items-end gap-x-2 sm:flex-nowrap md:gap-x-5">
        <select
          class="mb-2 sm:mb-0"
          name="client"
          id="client"
          required={!isNewClient}
          bind:value={invoice.client.id}
          on:change={() => {
            const selectedClient = $clients.find((client) => client.id === invoice.client.id);
            invoice.client.name = selectedClient?.name ?? '';
          }}
        >
          <option />
          {#each $clients as client}
            <option value={client.id}>{client.name}</option>
          {/each}
        </select>
        <div class="text-base font-bold leading-9 text-monsoon lg:leading-[3.5rem]">or</div>
        <Button
          label="+ Client"
          onClick={() => {
            isNewClient = true;
            invoice.client.name = '';
            invoice.client.email = '';
          }}
          style="outline"
          isAnimated={false}
        />
      </div>
    {:else}
      <label for="NewClient">New Client</label>
      <div class="flex flex-wrap items-end gap-x-2 sm:flex-nowrap md:gap-x-5">
        <input
          type="text"
          name="NewClient"
          id="NewClient"
          required={isNewClient}
          bind:value={newClient.name}
          class="mb-2 sm:mb-0"
        />
        <div class="text-base font-bold leading-9 text-monsoon lg:leading-[3.5rem]">or</div>
        <Button
          label="Existing Client"
          onClick={() => {
            isNewClient = false;
            newClient = {};
          }}
          style="outline"
          isAnimated={false}
        />
      </div>
    {/if}
  </div>

  <!-- Invoice Id -->
  <div class="field col-span-6 max-sm:-order-1 md:col-span-2">
    <label for="invoiceNumber">Invoice Id</label>
    <input type="number" name="invoiceNumber" required bind:value={invoice.invoiceNumber} />
  </div>

  <!-- New Client Information -->
  {#if isNewClient}
    <div class="field col-span-6 grid gap-x-5" transition:slide>
      <div class="field col-span-6">
        <label for="email">Client's Email</label>
        <input
          type="email"
          name="email"
          id="email"
          required={isNewClient}
          bind:value={newClient.email}
        />
      </div>

      <div class="field col-span-6">
        <label for="street">Street</label>
        <input type="text" name="street" id="street" bind:value={newClient.street} />
      </div>

      <div class="field col-span-2">
        <label for="city">City</label>
        <input type="text" name="city" id="city" bind:value={newClient.city} />
      </div>

      <div class="field col-span-2">
        <label for="state">State</label>
        <select name="state" id="state" bind:value={newClient.state}>
          <option />
          {#each states as state}
            <option value={state.value}>{state.name}</option>
          {/each}
        </select>
      </div>

      <div class="field col-span-2">
        <label for="zip">Zip</label>
        <input type="text" name="zip" id="zip" bind:value={newClient.zip} />
      </div>
    </div>
  {/if}

  <!-- Due Date -->
  <div class="field col-span-3 md:col-span-2">
    <label for="dueDate">Due Date</label>
    <input type="date" name="dueDate" min={today} required bind:value={invoice.dueDate} />
  </div>

  <!-- Issue Date -->
  <div class="field col-span-3 md:col-span-2 md:col-start-5">
    <label for="issueDate">Issue Date</label>
    <input type="date" name="issueDate" min={today} bind:value={invoice.issueDate} />
  </div>

  <!-- Subject -->
  <div class="field col-span-6">
    <label for="subject">Subject</label>
    <input type="text" name="subject" bind:value={invoice.subject} />
  </div>

  <!-- Line Items -->
  <div class="field col-span-6">
    <LineItemRows
      discount={invoice.discount}
      lineItems={invoice.lineItems}
      on:addlineItem={AddLineItem}
      on:removeLineItem={RemoveLineItem}
      on:updateLineItems={UpdateLineItems}
      on:updateDiscount={UpdateDiscount}
    />
  </div>

  <!-- Notes -->
  <div class="field col-span-6">
    <label for="notes"
      >Notes <span class="font-normal">(optional, displayed on the invoice)</span></label
    >
    <textarea name="notes" id="notes" bind:value={invoice.notes} />
  </div>

  <!-- Terms -->
  <div class="field col-span-6">
    <label for="terms">
      Terms <span class="font-normal">(optional, enter your terms & conditions)</span>
    </label>
    <textarea name="terms" id="terms" bind:value={invoice.terms} />
    <div class="text-xs text-gray-400">
      Formatting Tips: <strong>*bold*</strong>, <em>_italic_</em>
    </div>
  </div>

  <!-- Buttons -->
  <div class="field col-span-2">
    <!-- Show only if editing -->
    {#if formState === 'edit'}
      <Button
        label="Delete"
        style="textOnlyDestructive"
        onClick={() => {
          isModalShowing = true;
        }}
        leftIcon={Trash}
        isAnimated={false}
      />
    {/if}
  </div>

  <div class="field col-span-4 flex justify-end gap-x-5">
    <Button
      label="Cancel"
      onClick={() => {
        closePanel();
      }}
      style="secondary"
      isAnimated={false}
    />
    <button
      class="button translate-y-0 bg-lavenderIndigo text-white shadow-colored transition-all hover:-translate-y-2 hover:shadow-coloredHover"
    >
      {#if formState === 'edit'} Update {:else} Add {/if} Invoice
    </button>
  </div>
</form>

<ConfirmDelete
  {invoice}
  {isModalShowing}
  on:close={() => {
    isModalShowing = false;
    closePanel();
  }}
/>
