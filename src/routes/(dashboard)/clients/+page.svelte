<script lang="ts">
  import { Search, Button } from '$lib/components';
  import ClientRow from './ClientRow.svelte';
  import ClientRowHeader from './ClientRowHeader.svelte';
  import { clients, loadClients } from '$lib/stores/clientStore';
  import { onMount } from 'svelte';

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
  <Search />

  <!-- New Invoice Button -->
  <Button label="+ Client" onClick={() => {}} />
</div>

<!-- Clients -->

<div>
  {#if $clients === null}
    Loading...
  {:else if $clients.length <= 0}
    Blank State
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
