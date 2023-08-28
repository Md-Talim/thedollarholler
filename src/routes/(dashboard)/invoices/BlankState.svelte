<script>
  import BlankRow from '$lib/components/BlankRow.svelte';
  import InvoiceRowHeader from './InvoiceRowHeader.svelte';
</script>

<div>
  <div class="-mt-8 md:-mt-6 lg:-mt-14">
    <h2
      class="mb-10 mr-4 bg-arrowLeftUp bg-left bg-no-repeat pl-28 pt-14 font-handwriting text-4xl font-black text-caribbeanGreen md:bg-arrowRightUp md:bg-right md:pl-0 md:pr-28 md:text-right"
    >
      Add Your First Invoice
    </h2>
  </div>

  <!-- Invoice Header -->
  <InvoiceRowHeader className="text-fog" />

  <!-- Blank Row -->
  <BlankRow />
  <BlankRow />
  <BlankRow />
</div>
