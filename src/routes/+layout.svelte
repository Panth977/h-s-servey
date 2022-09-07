<script lang="ts">
  import "../app.css";
</script>

<nav class="bg-gray-200 h-16 z-50 sticky top-0 w-full">
  <button onclick="history.back()">
    <img alt="back icon" class="aspect-square h-16" src="/back-icon.svg" />
  </button>
</nav>

<div class="lateral-margin app min-h-[calc(100vh-8rem)] pb-10">
  <slot />
</div>

<div class="h-16 bg-white border-t items-center flex justify-around sticky bottom-0 w-full">
  <a href="/"><img alt="home icon" src="/home-icon.svg" /></a>
  <a href="/rank"><img alt="rank icon" src="/rank-icon.svg" /></a>
  <a href="/profile"><img alt="profile icon" src="/profile-icon.svg" /></a>
</div>

<style>
    .app :global(.drawer .panel) {
        background-color: transparent;
    }
</style>
