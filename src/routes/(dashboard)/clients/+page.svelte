<script lang="ts">
  import { Button, Search, SlidePanel } from '$lib/components';
  import { clients, loadClients } from '$lib/stores/ClientStore';
  import { onMount } from 'svelte';
  import BlankState from './BlankState.svelte';
  import ClientRow from './ClientRow.svelte';
  import ClientRowHeader from './ClientRowHeader.svelte';
  import ClientForm from './ClientForm.svelte';

  let isClientFormShowing: boolean = false;

  const closePanel = () => {
    isClientFormShowing = false;
  };

  onMount(() => {
    loadClients();
  });
</script>

<svelte:head>
  <title>Clients | The Dollar Holler</title>
</svelte:head>

<div
  class="mb-8 flex flex-col-reverse items-start justify-between gap-y-4 md:flex-row md:items-center lg:mb-16"
>
  <!-- Search Field -->
  {#if $clients.length <= 0}
    <div />
  {:else}
    <Search />
  {/if}

  <!-- New Invoice Button -->
  <Button
    label="+ Client"
    onClick={() => {
      isClientFormShowing = true;
    }}
  />
</div>

<!-- Clients -->

<div>
  {#if $clients === null}
    Loading...
  {:else if $clients.length <= 0}
    <BlankState />
  {:else}
    <!-- Client Row Header -->
    <ClientRowHeader />

    <!-- Client Rows -->
    <div class="flex flex-col-reverse">
      {#each $clients as client}
        <ClientRow {client} />
      {/each}
    </div>
  {/if}
</div>

<!-- Slide Panel -->
{#if isClientFormShowing}
  <SlidePanel on:close={closePanel}>
    <ClientForm {closePanel} />
  </SlidePanel>
{/if}
