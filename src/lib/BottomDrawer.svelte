<script lang="ts">
  import Drawer from "svelte-drawer-component";

  export let open: boolean;
  export let close: () => void;
  export let title: string;
</script>

<Drawer open={open} placement="bottom" size="100%">
  <div class="h-20 overflow-hidden fixed top-0 w-full" on:click={close}></div>
  <div
    class="bg-stone-800 h-14 mt-20 text-white rounded-t-3xl text-3xl py-3 flex justify-center"
  >
    {title}
  </div>
  <div class="bg-white min-h-[calc(100vh-8.5rem)] space-y-5 p-5">
    <div class="lateral-margin">
      <slot />
    </div>
  </div>
</Drawer>
