<script lang="ts">
  import { Navbar } from '$lib/components';
</script>

<div class="grid min-h-screen grid-cols-12 gap-x-16 bg-whisper">
  <Navbar />
  <main class="col-span-8 pt-10">
    <slot />
  </main>
</div>
