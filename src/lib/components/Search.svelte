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
    class="w-full border-b-2 border-dashed border-pastelPurple bg-transparent font-sansSerif text-lg outline-none focus:border-solid focus:border-lavenderIndigo md:w-64"
  />
  <button class="font-sansSerif text-xl font-bold text-pastelPurple">Search</button>
</div>
