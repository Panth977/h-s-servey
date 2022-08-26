<script lang="ts">
  export let title: string;
  export let src: string;
  export let url: string;
</script>

<a class="flex border-b text-2xl h-10 capitalize" href={url}
   target="_blank">
  {title}
  <img alt="link" class="h-auto w-5 ml-2" src="/go-to-icon.svg" />
</a>
<img alt={title} class="mt-5" src={src}>