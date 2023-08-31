<script lang="ts">
  function portal(node: HTMLElement) {
    let target: HTMLBodyElement | null;

    function update() {
      target = document.querySelector('body');
      target?.appendChild(node);
      node.hidden = false;
    }

    function destroy() {
      if (node.parentElement) node.parentElement.removeChild(node);
    }

    update();
    return { update, destroy };
  }
</script>

<div hidden use:portal>
  <slot>
    <!-- Optional Fallback -->
  </slot>
</div>
