<script lang="ts">
  import type { SvelteComponent } from 'svelte';

  export let options: {
    text: string;
    icon?: new (...args: any[]) => SvelteComponent;
    onClick: () => void;
    disabled: boolean;
  }[];
</script>

<ul class="absolute left-0 top-5 rounded-lg bg-white drop-shadow-lg">
  {#each options as option}
    {#if !option.disabled}
      <li>
        <button
          class="flex w-full gap-x-2 p-4 font-sansSerif font-bold text-pastelPurple hover:text-daisyBush"
        >
          {#if option.icon}
            <svelte:component this={option.icon} />
          {/if}
          {option.text}
        </button>
      </li>
    {/if}
  {/each}
</ul>

<style lang="postcss">
  li {
    @apply border-b-2 border-whisper;
  }

  li:last-child {
    @apply border-b-0;
  }
</style>
