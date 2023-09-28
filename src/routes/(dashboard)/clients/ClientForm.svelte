<script lang="ts">
  import { Button } from '$lib/components';
  import { Trash } from '$lib/components/Icons';
  import { addClient } from '$lib/stores/ClientStore';
  import states from '$lib/utils/states';

  export let closePanel: () => void = () => {};
  export let client: Client = {} as Client;
  export let formState: 'create' | 'edit' = 'create';

  const handleSubmit = () => {
    addClient(client);

    closePanel();
  };
</script>

<h2 class="mb-7 font-sansSerif text-3xl font-bold text-daisyBush">
  {#if formState === 'create'} Add a {:else} Edit {/if} client
</h2>

<form class="grid grid-cols-6 gap-x-5" on:submit|preventDefault={handleSubmit}>
  <div class="field col-span-6">
    <label for="name">Client Name</label>
    <input type="text" name="name" required bind:value={client.name} />
  </div>
  <div class="field col-span-6">
    <label for="email">EmailAddress</label>
    <input type="email" name="email" id="email" required bind:value={client.email} />
  </div>

  <div class="field col-span-6">
    <label for="street">Address</label>
    <input type="text" name="street" id="street" bind:value={client.street} />
  </div>

  <div class="field col-span-2">
    <label for="city">City</label>
    <input type="text" name="city" id="city" bind:value={client.city} />
  </div>

  <div class="field col-span-2">
    <label for="state">State</label>
    <select name="state" id="state" bind:value={client.state}>
      <option />
      {#each states as state}
        <option value={state.value}>{state.name}</option>
      {/each}
    </select>
  </div>

  <div class="field col-span-2">
    <label for="zip">Zip</label>
    <input type="text" name="zip" id="zip" bind:value={client.zip} />
  </div>

  <!-- Buttons -->
  <div class="field col-span-3">
    <!-- Only show if editing -->
    {#if formState === 'edit'}
      <Button
        label="Delete"
        leftIcon={Trash}
        isAnimated={false}
        style="textOnlyDestructive"
        onClick={() => {}}
      />
    {/if}
  </div>

  <div class="field col-span-3 flex justify-end gap-x-5">
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
      Save
    </button>
  </div>
</form>
