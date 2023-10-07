<script lang="ts">
  import { Search } from '$lib/components/Icons';
</script>

<div class="relative flex w-full items-baseline gap-2">
  <div class="mt-auto text-pastelPurple">
    <Search />
  </div>
  <input
    type="text"
    placeholder="Search by Keyword"
    class="search w-full border-b-2 border-dashed border-pastelPurple bg-transparent pr-20 font-sansSerif text-lg outline-none focus:border-solid focus:border-lavenderIndigo md:w-64 md:pr-0"
  />
  <button
    class="pointer-events-none absolute left-8 transform font-sansSerif text-xl font-bold text-pastelPurple transition-transform"
    >Search</button
  >
</div>

<style lang="postcss">
  ::placeholder {
    color: transparent;
  }

  input:not(:placeholder-shown) + button,
  input:focus + button {
    @apply pointer-events-auto left-auto right-0 translate-x-[calc(100%-65px)] text-right text-lavenderIndigo md:left-0 md:right-auto md:translate-x-[19rem] lg:translate-x-80;
  }

  input + button:focus,
  input:focus + button:hover {
    @apply text-daisyBush;
  }
</style>
