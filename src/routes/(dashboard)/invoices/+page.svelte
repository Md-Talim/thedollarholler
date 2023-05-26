<script>
  import { Search } from '$lib/components';
</script>

<svelte:head>
  <title>Invoices | The Dollar Hollar</title>
</svelte:head>

<div class="flex items-center justify-between">
  <!-- Search Field -->
  <Search />

  <!-- New Invoice Button -->
  <button
    class="relative translate-y-0 whitespace-nowrap rounded-lg bg-lavenderIndigo px-10 py-3 text-xl font-bold text-white shadow-colored transition-all hover:-translate-y-2 hover:shadow-coloredHover"
    >+ Invoice</button
  >
</div>
