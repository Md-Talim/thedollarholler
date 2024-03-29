<script lang="ts">
  import type { SvelteComponent } from 'svelte';

  export let style:
    | 'primary'
    | 'secondary'
    | 'destructive'
    | 'outline'
    | 'textOnly'
    | 'textOnlyDestructive' = 'primary';
  export let className: string = '';
  export let height: 'short' | 'regular' = 'regular';
  export let isAnimated = true;
  export let label: string;
  export let onClick: () => void;
  export let leftIcon: (new (...args: any[]) => SvelteComponent) | null = null;
  export let rightIcon: (new (...args: any[]) => SvelteComponent) | null = null;
</script>

<button
  on:click|preventDefault={() => onClick()}
  class={`button ${className}`}
  class:isAnimated
  class:primary={style === 'primary'}
  class:secondary={style === 'secondary'}
  class:destructive={style === 'destructive'}
  class:outline={style === 'outline'}
  class:textOnly={style === 'textOnly'}
  class:textOnlyDestructive={style === 'textOnlyDestructive'}
  class:short={height === 'short'}
>
  {#if leftIcon}
    <div class="mr-2">
      <svelte:component this={leftIcon} />
    </div>
  {/if}
  {label}
  {#if rightIcon}
    <div class="ml-2">
      <svelte:component this={leftIcon} />
    </div>
  {/if}
</button>

<style lang="postcss">
  .isAnimated {
    @apply translate-y-0 shadow-colored transition-all hover:-translate-y-2 hover:shadow-coloredHover;
  }
  .primary {
    @apply bg-lavenderIndigo text-white;
  }
  .secondary {
    @apply bg-gallery text-lavenderIndigo;
  }
  .destructive {
    @apply bg-scarlet text-goldenFizz;
  }
  .outline {
    @apply border-daisyBush text-daisyBush  hover:border-daisyBush hover:bg-daisyBush hover:text-white;
  }
  .textOnly {
    @apply bg-transparent px-0 text-lavenderIndigo no-underline hover:underline;
  }
  .textOnlyDestructive {
    @apply bg-transparent px-0 text-scarlet underline hover:no-underline;
  }
  .short {
    @apply !py-1;
  }
</style>
