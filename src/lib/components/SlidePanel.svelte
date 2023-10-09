<script lang="ts">
  import { clickOutside } from '$lib/actions/ClickOutside';
  import { Overlay, Portal } from '$lib/components';
  import { createEventDispatcher } from 'svelte';
  import { fly } from 'svelte/transition';
  import { Arrow } from './Icons';

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
    transition:fly={{ x: 1000, duration: 300 }}
    use:clickOutside={() => {
      dispatch('close');
    }}
  >
    <button
      class="absolute left-7 top-5 text-pastelPurple hover:text-daisyBush"
      on:click={() => dispatch('close')}><Arrow /></button
    >
    <slot />
  </div>
</Portal>
