<script lang="ts">
  import { Button, Search } from '$lib/components';
  import { clients, loadClients } from '$lib/stores/ClientStore';
  import { onMount } from 'svelte';
  import ClientRow from './ClientRow.svelte';
  import ClientRowHeader from './ClientRowHeader.svelte';

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
