<script lang="ts">
  import { createEventDispatcher } from 'svelte';
  import { Arrow } from './Icons';
  import { Overlay, Portal } from '$lib/components';

  const dispatch = createEventDispatcher();
</script>

<svelte:window
  on:keydown={(event) => {
    if (event.key === 'Escape') {
      dispatch('close');
    }
  }}
/>

<Portal>
  <Overlay />
  <div
    class="fixed right-0 top-0 z-slidePanel h-screen w-full overflow-y-scroll bg-white px-5 pt-16 lg:w-3/4 lg:px-32 lg:py-20"
  >
    <button
      class="absolute left-7 top-5 text-pastelPurple hover:text-daisyBush"
      on:click={() => dispatch('close')}><Arrow /></button
    >
    <slot />
  </div>
</Portal>
