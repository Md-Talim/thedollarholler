<script lang="ts">
  import Activate from '$lib/components/Icons/Activate.svelte';
  import Archieve from '$lib/components/Icons/Archieve.svelte';
  import { AdditionalOptions, Tag } from '$lib/components';
  import { Edit, ThreeDots, Trash, View } from '$lib/components/Icons';

  export let client: Client;

  let isAdditionalOptionsShowing: boolean = false;
</script>

<div class="client-table rounded-lg bg-white py-3 shadow-tableRow lg:py-6">
  <div><Tag className="ml-auto lg:ml-0" label={client.clientStatus} /></div>
  <div class="truncate whitespace-nowrap text-base font-bold lg:text-xl">{client.name}</div>
  <div class="text-right font-mono text-sm font-bold lg:text-lg">$336</div>
  <div class="text-right font-mono text-sm font-bold text-scarlet lg:text-lg">$200</div>
  <div class="relative hidden items-center justify-center lg:flex">
    <a href="/" class="text-pastelPurple hover:text-daisyBush">
      <View />
    </a>
  </div>
  <div class="relative hidden items-center justify-center lg:flex">
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
              console.log('editing');
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
            text: 'Archieve',
            icon: Archieve,
            onClick: () => {
              client.clientStatus = 'archieve';
              isAdditionalOptionsShowing = false;
            },
            disabled: client.clientStatus === 'archieve'
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
