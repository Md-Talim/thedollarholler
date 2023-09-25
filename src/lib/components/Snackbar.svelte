<script lang="ts">
  import { snackbar } from '$lib/stores/SnackbarStore';
  import { flip } from 'svelte/animate';
  import { fade, fly } from 'svelte/transition';
  import { Portal, SnackbarMessage } from './';
  import { Cancel } from './Icons';
</script>

<Portal>
  <div class="fixed left-1/2 top-5 z-toaster -translate-x-1/2">
    {#each $snackbar as content (content.id)}
      <div in:fly={{ opacity: 0, y: -100 }} out:fade={{ duration: 300 }} animate:flip>
        <div
          class="mb-2 inline-block rounded-lg px-5 py-4 text-lg font-bold"
          class:info={content.type === 'info'}
          class:error={content.type === 'error'}
          class:warning={content.type === 'warning'}
          class:success={content.type === 'success'}
        >
          <div class="flex gap-4">
            <SnackbarMessage message={content.message} />
            <button on:click={() => snackbar.remove(content.id)}>
              <Cancel />
            </button>
          </div>
        </div>
      </div>
    {/each}
  </div>
</Portal>

<style lang="postcss">
  .info {
    @apply bg-prim text-daisyBush;
  }

  .warning {
    @apply bg-goldenFizz text-scarlet;
  }

  .error {
    @apply bg-scarlet text-goldenFizz;
  }

  .success {
    @apply bg-robinEggBlue text-daisyBush;
  }
</style>
