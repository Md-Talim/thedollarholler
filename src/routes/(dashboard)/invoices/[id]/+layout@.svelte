<script lang="ts">
  import { afterNavigate, goto } from '$app/navigation';
  import { Arrow } from '$lib/components/Icons';

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

<div
  class="h-full min-h-screen bg-whisper pb-32 pt-16 print:bg-transparent print:pb-0 print:pt-0 lg:pt-12"
>
  <main class="min-h-scree mx-auto max-w-screen-lg">
    <a
      href={previousPage ? previousPage : '/invoices'}
      class="fixed left-7 top-7 text-pastelPurple print:hidden"
    >
      <Arrow />
    </a>
    <slot />
  </main>
</div>
