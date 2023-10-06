<script lang="ts">
  export let message: string = '';
</script>

{#if message}
  <div class="center mb-8 rounded-md bg-lavenderIndigo p-4 text-base text-white">
    <p>{message}</p>
  </div>
{/if}
