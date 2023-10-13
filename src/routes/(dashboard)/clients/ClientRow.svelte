<script lang="ts">
  import { clickOutside } from '$lib/actions/ClickOutside';
  import { swipe } from '$lib/actions/Swipe';
  import { AdditionalOptions, SlidePanel, Tag } from '$lib/components';
  import { Activate, Archive, Cancel, Edit, ThreeDots, Trash, View } from '$lib/components/Icons';
  import { centsToDollars, sumInvoices } from '$lib/utils/moneyHelpers';
  import ClientForm from './ClientForm.svelte';

  export let client: Client;
  let triggerReset = false;

  const receivedInvoices = () => {
    if (client.invoices) {
      const paidInvoices = client.invoices.filter((invoice) => invoice.invoiceStatus === 'paid');

      return sumInvoices(paidInvoices);
    }

    return 0;
  };

  const balanceInvoices = () => {
    if (client.invoices) {
      const unpaidInvoices = client.invoices.filter((invoice) => invoice.invoiceStatus !== 'paid');

      return sumInvoices(unpaidInvoices);
    }

    return 0;
  };

  let isAdditionalOptionsShowing: boolean = false;
  let isClientFormShowing: boolean = false;

  const closePanel = () => {
    isClientFormShowing = false;
  };

  const handleEdit = () => {
    isClientFormShowing = true;
    isAdditionalOptionsShowing = false;
  };

  const handleActivate = () => {
    client.clientStatus = 'active';
    isAdditionalOptionsShowing = false;
  };

  const handleArchive = () => {
    client.clientStatus = 'archive';
    isAdditionalOptionsShowing = false;
  };

  const handleDelete = () => {
    console.log('deleting...');
  };
</script>

<div class="relative">
  <div
    class="client-table client-row relative z-row rounded-lg bg-white py-3 shadow-tableRow lg:py-6"
    use:swipe={{ triggerReset }}
    on:outOfView={() => {
      triggerReset = false;
    }}
  >
    <div class="status"><Tag className="ml-auto lg:ml-0" label={client.clientStatus} /></div>
    <div class="client-name truncate whitespace-nowrap text-base font-bold lg:text-xl">
      {client.name}
    </div>
    <div class="received font-mono text-sm font-bold lg:text-lg">
      ${centsToDollars(receivedInvoices())}
    </div>
    <div class="balance text-right font-mono text-sm font-bold text-scarlet lg:text-lg">
      ${centsToDollars(balanceInvoices())}
    </div>
    <div class="view relative hidden items-center justify-center lg:flex">
      <a href={`/clients/${client.id}`} class="text-pastelPurple hover:text-daisyBush">
        <View />
      </a>
    </div>
    <div
      class="three-dots relative hidden items-center justify-center lg:flex"
      use:clickOutside={() => {
        isAdditionalOptionsShowing = false;
      }}
    >
      <button
        class="text-pastelPurple hover:text-daisyBush"
        on:click={() => (isAdditionalOptionsShowing = !isAdditionalOptionsShowing)}
      >
        <ThreeDots />
      </button>
      {#if isAdditionalOptionsShowing}
        <AdditionalOptions
          options={[
            {
              text: 'Edit',
              icon: Edit,
              onClick: handleEdit,
              disabled: false
            },
            {
              text: 'Activate',
              icon: Activate,
              onClick: handleActivate,
              disabled: client.clientStatus === 'active'
            },
            {
              text: 'archive',
              icon: Archive,
              onClick: handleArchive,
              disabled: client.clientStatus === 'archive'
            },
            {
              text: 'Delete',
              icon: Trash,
              onClick: handleDelete,
              disabled: false
            }
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
    <button class="action-button" on:click={handleEdit}>
      <Edit height={32} width={32} />
      Edit
    </button>
    {#if client.clientStatus === 'archive'}
      <button class="action-button" on:click={handleActivate}>
        <Activate height={32} width={32} />
        Activate
      </button>
    {/if}
    {#if client.clientStatus === 'active'}
      <button class="action-button" on:click={handleArchive}>
        <Archive height={32} width={32} />
        Archive
      </button>
    {/if}
    <button class="action-button" on:click={handleDelete}>
      <Trash height={32} width={32} />
      Delete
    </button>
    <a href={`/clients/${client.id}`} class="action-button">
      <View height={32} width={32} />
      View
    </a>
  </div>
</div>

<!-- Slide Panel -->
{#if isClientFormShowing}
  <SlidePanel on:close={closePanel}>
    <ClientForm {closePanel} {client} formState="edit" />
  </SlidePanel>
{/if}

<style lang="postcss">
  .client-row {
    grid-template-areas: 'clientName status' 'received balance';
  }

  @media (min-width: 1024px) {
    .client-row {
      grid-template-areas: 'status clientName received balance view three-dots';
    }
  }

  .client-name {
    grid-area: clientName;
  }

  .status {
    grid-area: status;
  }

  .received {
    @apply text-left lg:text-right;
    grid-area: received;
  }

  .received:before {
    @apply block opacity-95 lg:hidden;
    content: 'Received: ';
  }

  .balance {
    grid-area: balance;
  }

  .balance:before {
    @apply block text-xs lg:hidden;
    content: 'Balance: ';
  }
</style>
