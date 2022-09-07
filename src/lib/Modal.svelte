<script lang="ts">
  import Drawer from "svelte-drawer-component";

  export let open: boolean;
  export let close: () => void;
  export let title: string | undefined;
</script>

<Drawer open={open} placement="bottom" size="100%">
  <div class="h-screen w-screen absolute z-40" on:click={close}></div>
  <div class="flex justify-center">
    <div
      class="bg-white rounded-3xl pb-5 px-10 max-h-96 z-50 hide-scroll-bar overflow-auto mt-36 items-center"
    >
      {#if (title !== undefined)}
        <h1 class="text-2xl mt-5 sticky top-0 bg-white">{title}</h1>
      {/if}
      <slot />
    </div>
  </div>
</Drawer>

<style>
    .hide-scroll-bar {
        -ms-overflow-style: none; /* Internet Explorer 10+ */
        scrollbar-width: none; /* Firefox */
    }

    .hide-scroll-bar::-webkit-scrollbar {
        display: none; /* Safari and Chrome */
    }
</style>
