<script lang="ts">
  import { Navbar, Snackbar } from '$lib/components';
</script>

<Snackbar />
<div class="grid min-h-screen grid-cols-12 bg-whisper md:gap-x-16">
  <Navbar />
  <main class="col-span-12 px-4 pt-6 md:col-span-8 md:pt-10">
    <slot />
  </main>
</div>
