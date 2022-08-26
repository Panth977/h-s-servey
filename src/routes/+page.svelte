<script lang="ts">
  import { onDestroy, onMount } from "svelte";
  import AdDialog from "../lib/AdDialog.svelte";
  import Drawer from "svelte-drawer-component";
  import { allPlayerStats } from "./rank/player/+page.svelte";

  let upcomingMatchDrawer = false;
  let newsDrawer = false;
  let i = 1;
  let interval;
  onMount(function() {
    if (interval) clearInterval(interval);
    if (interval !== null) interval = setInterval(function() {
      i %= ads.length;
      document.getElementById(getAdId(i++)).scrollIntoView({ behavior: "smooth", block: "nearest" });
    }, 5000);
    addEventListener("scroll", function(event) {
      if (window.scrollY > 200) {
        if (interval) {
          clearInterval(interval);
          interval = null;
        }
      } else {
        if (!interval) {
          interval = setInterval(function() {
            i %= ads.length;
            document.getElementById(getAdId(i++)).scrollIntoView({ behavior: "smooth", block: "nearest" });
          }, 5000);
        }
      }
    });
  });
  onDestroy(function() {
    if (interval) clearInterval(interval);
  });

  function getAdId(index: number) {
    return `ad-${index}`;
  }

  const ads = [
    { src: "/ad-1.svg", url: "https://www.google.com", title: "ad-1" },
    { src: "/ad-2.svg", url: "https://www.google.com", title: "ad-2" },
    { src: "/ad-3.svg", url: "https://www.google.com", title: "ad-3" }
  ];
  const liveScore = {
    0: { name: "MCI", poster: "/team-poster.png", goal: 2 },
    1: { name: "MUN", poster: "/team-poster.png", goal: 0 }
  };
  const upcomingMatches: { 0: { name: string, poster: string }, 1: { name: string, poster: string }, time: string }[] = [
    {
      0: { name: "Liverpool", poster: "/team-poster.png" },
      1: { name: "Chelsea", poster: "/team-poster.png" },
      time: "4:00 PM GMT"
    },
    {
      0: { name: "PSG", poster: "/team-poster.png" },
      1: { name: "Real Madrid", poster: "/team-poster.png" },
      time: "8:00 PM GMT"
    },
    {
      0: { name: "Liverpool", poster: "/team-poster.png" },
      1: { name: "Chelsea", poster: "/team-poster.png" },
      time: "4:00 PM GMT"
    },
    {
      0: { name: "PSG", poster: "/team-poster.png" },
      1: { name: "Real Madrid", poster: "/team-poster.png" },
      time: "8:00 PM GMT"
    }, {
      0: { name: "Liverpool", poster: "/team-poster.png" },
      1: { name: "Chelsea", poster: "/team-poster.png" },
      time: "4:00 PM GMT"
    },
    {
      0: { name: "PSG", poster: "/team-poster.png" },
      1: { name: "Real Madrid", poster: "/team-poster.png" },
      time: "8:00 PM GMT"
    }, {
      0: { name: "Liverpool", poster: "/team-poster.png" },
      1: { name: "Chelsea", poster: "/team-poster.png" },
      time: "4:00 PM GMT"
    },
    {
      0: { name: "PSG", poster: "/team-poster.png" },
      1: { name: "Real Madrid", poster: "/team-poster.png" },
      time: "8:00 PM GMT"
    }, {
      0: { name: "Liverpool", poster: "/team-poster.png" },
      1: { name: "Chelsea", poster: "/team-poster.png" },
      time: "4:00 PM GMT"
    },
    {
      0: { name: "PSG", poster: "/team-poster.png" },
      1: { name: "Real Madrid", poster: "/team-poster.png" },
      time: "8:00 PM GMT"
    }
  ];
  const news: { title: string, content: string, image: string }[] = [
    {
      title: "Streak broke",
      content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
      image: "/news-image-1.jpg"
    },
    {
      title: "Necessary times",
      content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
      image: "/news-image-2.webp"
    }, {
      title: "Streak broke",
      content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
      image: "/news-image-1.jpg"
    },
    {
      title: "Necessary times",
      content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
      image: "/news-image-2.webp"
    }, {
      title: "Streak broke",
      content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
      image: "/news-image-1.jpg"
    },
    {
      title: "Necessary times",
      content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
      image: "/news-image-2.webp"
    }, {
      title: "Streak broke",
      content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
      image: "/news-image-1.jpg"
    },
    {
      title: "Necessary times",
      content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
      image: "/news-image-2.webp"
    }
  ];
  allPlayerStats;
</script>

<div class="p-5 z-50 bg-white sticky top-16 w-full">
  <div class="bg-gray-700 rounded-xl h-14 justify-around flex items-center px-5 text-3xl text-white">
    <span class="flex">
      <img alt={liveScore[0].name}
           class="p-1 mx-4 w-10 h-10 bg-white rounded-full ring-2 ring-white"
           src={liveScore[0].poster} />
      {liveScore[0].name}
    </span>
    <span class="pb-1">{liveScore[0].goal}-{liveScore[1].goal}</span>
    <span class="flex">
      {liveScore[1].name}
      <img alt={liveScore[1].name}
           class="p-1 mx-4 w-10 h-10 bg-white rounded-full ring-2 ring-white"
           src={liveScore[1].poster} />
    </span>
  </div>
</div>
<ul
  class="flex w-full snap-x snap-mandatory gap-6 overflow-x-auto overscroll-x-none pb-6 before:w-3 before:shrink-0 after:w-3 after:shrink-0 hide-scroll-bar"
>
  {#each ads as { src, title, url }, index}
    <li id={getAdId(index)} class="shrink-0 snap-center">
      <img on:click={async () => {
        const res = await import("svelte-dialogs");
        await res.dialogs.modal({content: AdDialog, props: {src, title, url}});
      }}
           src={src}
           class="h-44 w-screen object-cover"
           alt={title} />
    </li>
  {/each}
</ul>
<div class="mt-5 bg-gray-200 py-3 space-y-3">
  {#each upcomingMatches.slice(0, 2) as match}
    <div class="h-14 justify-around flex items-center">
      <img alt={match[0].name}
           class="p-1 mx-4 w-10 h-10 bg-white rounded-full ring-2 ring-white"
           src={match[0].poster} />
      <span>
      <span class="text-3xl block">
        {match[0].name} - {match[1].name}
      </span>
      <span class="block flex justify-center">
        {match.time}
      </span>
    </span>
      <img alt={match[1].name}
           class="p-1 mx-4 w-10 h-10 bg-white rounded-full ring-2 ring-white"
           src={match[1].poster} />
    </div>
  {/each}
  <div class="flex justify-end px-5">
    <Drawer open={upcomingMatchDrawer} placement="bottom" size="100%">
      <div class="h-20 overflow-hidden fixed top-0 w-full" on:click={() => upcomingMatchDrawer = false}>
      </div>
      <div class="bg-stone-800 h-14 mt-20 text-white rounded-t-3xl text-3xl py-3 flex justify-center">
        Fixtures
      </div>
      <div class="bg-white min-h-[calc(100vh-8.5rem)] space-y-5 p-5">
        {#each upcomingMatches as match}
          <div class="h-14 justify-around flex items-center">
            <img alt={match[0].name}
                 class="p-1 mx-4 w-10 h-10 bg-white rounded-full ring-2 ring-white"
                 src={match[0].poster} />
            <span>
      <span class="text-3xl block">
        {match[0].name} - {match[1].name}
      </span>
      <span class="block flex justify-center">
        {match.time}
      </span>
    </span>
            <img alt={match[1].name}
                 class="p-1 mx-4 w-10 h-10 bg-white rounded-full ring-2 ring-white"
                 src={match[1].poster} />
          </div>
        {/each}
      </div>
    </Drawer>
    <button class="bg-stone-800 text-white p-1 rounded-full px-5" on:click={() => upcomingMatchDrawer = true}>
      See All
    </button>
  </div>
</div>
<div>
  <div class="hide-scroll-bar mt-5 overflow-x-auto relative">
    <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
      <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
      <tr>
        <th class="py-3 px-6" scope="col">Pos</th>
        <th class="py-3 px-6" scope="col">Player</th>
        <th class="py-3 px-6" scope="col">M</th>
        <th class="py-3 px-6" scope="col">G</th>
        <th class="py-3 px-6" scope="col">A</th>
        <th class="py-3 px-6" scope="col">Y</th>
        <th class="py-3 px-6" scope="col">R</th>
      </tr>
      </thead>
      <tbody>
      {#each allPlayerStats.slice(0, 2) as playerStats, i}
        <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
          <td class="py-4 px-6">{i + 1}</td>
          <th class="py-4 px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white"
              scope="row">
            <a href={"/profile/player/" + playerStats.playerID}>{playerStats.name}</a>
          </th>
          <td class="py-4 px-6">{playerStats.m}</td>
          <td class="py-4 px-6">{playerStats.g}</td>
          <td class="py-4 px-6">{playerStats.a}</td>
          <td class="py-4 px-6">{playerStats.y}</td>
          <td class="py-4 px-6">{playerStats.r}</td>
        </tr>
      {/each}
      </tbody>
    </table>
  </div>
  <div class="flex mt-3 justify-end px-5">
    <a class="bg-stone-800 text-white p-1 rounded-full px-5" href="rank/player">
      Full Table
    </a>
  </div>
</div>
<div class="h-48 mt-5 bg-gray-200">
  <p class="text-3xl flex justify-center items-center h-full">??</p>
</div>
<div>
  <div class="bg-gray-200 mt-5 p-5">
    <h2 class="text-3xl flex justify-center">Latest News</h2>
    <div class="mt-2 h-20 overflow-hidden flex items-start">
      <img alt={news[0].title} class="object-contain h-20 pt-2 w-[20vw]" src={news[0].image} />
      <div class="px-2">
        <h3 class="capitalize text-xl">{news[0].title}</h3>
        <p>{news[0].content}</p>
      </div>
    </div>
    <div class="mt-2 h-20 border-t border-black/20 overflow-hidden flex items-start">
      <div class="px-2">
        <h3 class="capitalize text-xl">{news[1].title}</h3>
        <p>{news[1].content}</p>
      </div>
      <img alt={news[1].title} class="object-contain h-20 pt-2 w-[20vw]" src={news[1].image} />
    </div>

  </div>
  <div class="flex mt-3 justify-end px-5">
    <Drawer open={newsDrawer} placement="bottom" size="100%">
      <div class="h-20 overflow-hidden fixed top-0 w-full" on:click={() => newsDrawer = false}>
      </div>
      <div class="bg-stone-800 h-14 mt-20 text-white rounded-t-3xl text-3xl py-3 flex justify-center">
        News
      </div>
      <div class="bg-white min-h-[calc(100vh-8.5rem)] space-y-5 p-5">
        {#each news as { title, content, image }}
          <h2 class="text-xl font-bold">{title}</h2>
          <img src={image} alt={title} />
          <p class="lg">{content}</p>
        {/each}
      </div>
    </Drawer>
    <button class="bg-stone-800 text-white p-1 rounded-full px-5" on:click={() => newsDrawer = true}>
      See All
    </button>
  </div>
</div>

<!-- (latest-2-videos) video poster, text, bottom-drawer for see more -->
<div class="h-10"></div>
<style>
    .hide-scroll-bar {
        -ms-overflow-style: none; /* Internet Explorer 10+ */
        scrollbar-width: none; /* Firefox */
    }

    .hide-scroll-bar::-webkit-scrollbar {
        display: none; /* Safari and Chrome */
    }

</style>