<script lang="ts">
  export let label: 'draft' | 'current' | 'sent' | 'paid' | 'late' = 'draft';
  export let className = '';
</script>

<div
  class={`w-16 rounded-full border text-center text-sm font-bold capitalize md:w-20 md:text-lg ${className}`}
  class:inverted={label === 'draft'}
  class:success={label === 'sent' || label === 'current'}
  class:alert={label === 'late'}
  class:archieve={label === 'paid'}
>
  {label}
</div>

<style lang="postcss">
  .inverted {
    @apply border-pastelPurple text-pastelPurple;
  }

  .success {
    @apply border-robinEggBlue bg-robinEggBlue text-blueGem;
  }

  .alert {
    @apply border-scarlet bg-scarlet text-goldenFizz;
  }

  .archieve {
    @apply border-pastelPurple bg-pastelPurple text-white;
  }
</style>
