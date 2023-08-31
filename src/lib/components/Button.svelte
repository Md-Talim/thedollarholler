<script lang="ts">
  export let style: 'primary' | 'secondary' | 'destructive' = 'primary';
  export let isAnimated = true;
  export let label: string;
  export let onClick: () => void;
</script>

<button
  on:click|preventDefault={() => onClick()}
  class="lg-py-3 relative whitespace-nowrap rounded-lg bg-lavenderIndigo px-5 py-2 text-xl font-bold text-white lg:px-10"
  class:isAnimated
  class:primary={style === 'primary'}
  class:secondary={style === 'secondary'}
  class:destructive={style === 'destructive'}>{label}</button
>

<style lang="postcss">
  .isAnimated {
    @apply translate-y-0 shadow-colored transition-all hover:-translate-y-2 hover:shadow-coloredHover;
  }
  .primary {
    @apply bg-lavenderIndigo text-white;
  }
  .secondary {
    @apply bg-prim text-lavenderIndigo;
  }
  .destructive {
    @apply bg-scarlet text-goldenFizz;
  }
</style>
