<div class="grid min-h-screen grid-cols-12 gap-x-16 bg-whisper">
  <header class="col-span-3 space-y-8 bg-daisyBush pt-10 text-center">
    <div>
      <a href="/invoices"><img src="/images/logo.svg" alt="dollar hollar logo" class="mx-auto" /></a
      >
    </div>
    <nav>
      <ul class="text-2xl">
        <li><a href="/invoices">Invoices</a></li>
        <li><a href="/clients">Clients</a></li>
        <li><a href="/">Settings</a></li>
        <li><a href="/">Logout</a></li>
      </ul>
    </nav>
  </header>
  <main class="col-span-8 pt-10">
    <slot />
  </main>
</div>

<style lang="postcss">
  nav ul li {
    @apply mb-6;
  }

  nav ul li a {
    @apply font-bold text-white hover:text-goldenFizz;
  }
</style>
