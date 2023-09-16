<script lang="ts">
  import { afterNavigate, goto } from '$app/navigation';
  import Arrow from '$lib/components/Icons/Arrow.svelte';

  let previousPage: string | undefined = undefined;

  afterNavigate((navigation) => {
    previousPage = navigation?.from?.url?.pathname;
  });
</script>

<svelte:window
  on:keydown={(event) => {
    if (event.key === 'Escape') {
      goto(previousPage || '/invoices');
    }
  }}
/>

<div class="h-full min-h-screen w-screen bg-whisper pb-32 pt-12">
  <main class="min-h-scree mx-auto max-w-screen-lg">
    <a
      href={previousPage ? previousPage : '/invoices'}
      class="absolute left-7 top-7 text-pastelPurple"
    >
      <Arrow />
    </a>
    <slot />
  </main>
</div>
