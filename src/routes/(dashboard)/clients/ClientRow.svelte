<script lang="ts">
  import { AdditionalOptions, SlidePanel, Tag } from '$lib/components';
  import { Activate, Archive, Edit, ThreeDots, Trash, View } from '$lib/components/Icons';
  import { centsToDollars, sumInvoices } from '$lib/utils/moneyHelpers';
  import ClientForm from './ClientForm.svelte';

  export let client: Client;

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
</script>

<div class="client-table client-row rounded-lg bg-white py-3 shadow-tableRow lg:py-6">
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
    <a href="/" class="text-pastelPurple hover:text-daisyBush">
      <View />
    </a>
  </div>
  <div class="three-dots relative hidden items-center justify-center lg:flex">
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
            onClick: () => {
              handleEdit();
            },
            disabled: false
          },
          {
            text: 'Activate',
            icon: Activate,
            onClick: () => {
              client.clientStatus = 'active';
              isAdditionalOptionsShowing = false;
            },
            disabled: client.clientStatus === 'active'
          },
          {
            text: 'archive',
            icon: Archive,
            onClick: () => {
              client.clientStatus = 'archive';
              isAdditionalOptionsShowing = false;
            },
            disabled: client.clientStatus === 'archive'
          },
          {
            text: 'Delete',
            icon: Trash,
            onClick: () => {
              console.log('deleting');
            },
            disabled: false
          }
        ]}
      />
    {/if}
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
