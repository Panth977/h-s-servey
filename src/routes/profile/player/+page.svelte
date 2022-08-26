<script lang="ts">
  import Drawer from "svelte-drawer-component";

  const teams: { [teamID: string]: { name: string, player: { [playerID: string]: string } } } = {
    "d5v4s": {
      name: "Man. City",
      player: {
        ad8: "Player1",
        ad8d8: "Player3",
        add8: "Player1",
        afd8d8: "Player3",
        afd8: "Player1",
        ad8fd8: "Player3",
        ada8: "Player1",
        ada8d8: "Player3",
        adas8: "Player1",
        ad8sd8: "Player3",
        adasd8: "Player1",
        afd8asd8: "Player3",
        afdd8: "Player1",
        ad8fdd8: "Player3",
        adad8: "Player1",
        asdda8d8: "Player3"
      }
    },
    "da68d": {
      name: "What Eves.",
      player: {
        ad8: "Player1",
        ad8d8: "Player3",
        add8: "Player1",
        afd8d8: "Player3",
        afd8: "Player1",
        ad8fd8: "Player3",
        ada8: "Player1",
        ada8d8: "Player3",
        adas8: "Player1",
        ad8sd8: "Player3",
        adasd8: "Player1",
        afd8asd8: "Player3",
        afdd8: "Player1",
        ad8fdd8: "Player3",
        adad8: "Player1",
        asdda8d8: "Player3"
      }
    },
    "da5v4": {
      name: "What Eves.",
      player: {
        ad8: "Player1",
        ad8d8: "Player3",
        add8: "Player1",
        afd8d8: "Player3",
        afd8: "Player1",
        ad8fd8: "Player3",
        ada8: "Player1",
        ada8d8: "Player3",
        adas8: "Player1",
        ad8sd8: "Player3",
        adasd8: "Player1",
        afd8asd8: "Player3",
        afdd8: "Player1",
        ad8fdd8: "Player3",
        adad8: "Player1",
        asdda8d8: "Player3"
      }
    },
    "ad93c": {
      name: "What Eves.",
      player: {
        ad8: "Player1",
        ad8d8: "Player3",
        add8: "Player1",
        afd8d8: "Player3",
        afd8: "Player1",
        ad8fd8: "Player3",
        ada8: "Player1",
        ada8d8: "Player3",
        adas8: "Player1",
        ad8sd8: "Player3",
        adasd8: "Player1",
        afd8asd8: "Player3",
        afdd8: "Player1",
        ad8fdd8: "Player3",
        adad8: "Player1",
        asdda8d8: "Player3"
      }
    },
    "68ad4": {
      name: "Man. City",
      player: {
        ad8: "Player1",
        ad8d8: "Player3",
        add8: "Player1",
        afd8d8: "Player3",
        afd8: "Player1",
        ad8fd8: "Player3",
        ada8: "Player1",
        ada8d8: "Player3",
        adas8: "Player1",
        ad8sd8: "Player3",
        adasd8: "Player1",
        afd8asd8: "Player3",
        afdd8: "Player1",
        ad8fdd8: "Player3",
        adad8: "Player1",
        asdda8d8: "Player3"
      }
    },
    "6a84c": {
      name: "What Eves.",
      player: {
        ad8: "Player1",
        ad8d8: "Player3",
        add8: "Player1",
        afd8d8: "Player3",
        afd8: "Player1",
        ad8fd8: "Player3",
        ada8: "Player1",
        ada8d8: "Player3",
        adas8: "Player1",
        ad8sd8: "Player3",
        adasd8: "Player1",
        afd8asd8: "Player3",
        afdd8: "Player1",
        ad8fdd8: "Player3",
        adad8: "Player1",
        asdda8d8: "Player3"
      }
    },
    "a8dcd": {
      name: "Man. City",
      player: {
        ad8: "Player1",
        ad8d8: "Player3",
        add8: "Player1",
        afd8d8: "Player3",
        afd8: "Player1",
        ad8fd8: "Player3",
        ada8: "Player1",
        ada8d8: "Player3",
        adas8: "Player1",
        ad8sd8: "Player3",
        adasd8: "Player1",
        afd8asd8: "Player3",
        afdd8: "Player1",
        ad8fdd8: "Player3",
        adad8: "Player1",
        asdda8d8: "Player3"
      }
    },
    "6da88": {
      name: "What Eves.",
      player: {
        ad8: "Player1",
        ad8d8: "Player3",
        add8: "Player1",
        afd8d8: "Player3",
        afd8: "Player1",
        ad8fd8: "Player3",
        ada8: "Player1",
        ada8d8: "Player3",
        adas8: "Player1",
        ad8sd8: "Player3",
        adasd8: "Player1",
        afd8asd8: "Player3",
        afdd8: "Player1",
        ad8fdd8: "Player3",
        adad8: "Player1",
        asdda8d8: "Player3"
      }
    },
    "6d5v4s": {
      name: "Man. City",
      player: {
        ad8: "Player1",
        ad8d8: "Player3",
        add8: "Player1",
        afd8d8: "Player3",
        afd8: "Player1",
        ad8fd8: "Player3",
        ada8: "Player1",
        ada8d8: "Player3",
        adas8: "Player1",
        ad8sd8: "Player3",
        adasd8: "Player1",
        afd8asd8: "Player3",
        afdd8: "Player1",
        ad8fdd8: "Player3",
        adad8: "Player1",
        asdda8d8: "Player3"
      }
    },
    "6da68d": {
      name: "What Eves.",
      player: {
        ad8: "Player1",
        ad8d8: "Player3",
        add8: "Player1",
        afd8d8: "Player3",
        afd8: "Player1",
        ad8fd8: "Player3",
        ada8: "Player1",
        ada8d8: "Player3",
        adas8: "Player1",
        ad8sd8: "Player3",
        adasd8: "Player1",
        afd8asd8: "Player3",
        afdd8: "Player1",
        ad8fdd8: "Player3",
        adad8: "Player1",
        asdda8d8: "Player3"
      }
    },
    "6da5v4": {
      name: "Man. City",
      player: {
        ad8: "Player1",
        ad8d8: "Player3",
        add8: "Player1",
        afd8d8: "Player3",
        afd8: "Player1",
        ad8fd8: "Player3",
        ada8: "Player1",
        ada8d8: "Player3",
        adas8: "Player1",
        ad8sd8: "Player3",
        adasd8: "Player1",
        afd8asd8: "Player3",
        afdd8: "Player1",
        ad8fdd8: "Player3",
        adad8: "Player1",
        asdda8d8: "Player3"
      }
    },
    "6ad93c": {
      name: "What Eves.",
      player: {
        ad8: "Player1",
        ad8d8: "Player3",
        add8: "Player1",
        afd8d8: "Player3",
        afd8: "Player1",
        ad8fd8: "Player3",
        ada8: "Player1",
        ada8d8: "Player3",
        adas8: "Player1",
        ad8sd8: "Player3",
        adasd8: "Player1",
        afd8asd8: "Player3",
        afdd8: "Player1",
        ad8fdd8: "Player3",
        adad8: "Player1",
        asdda8d8: "Player3"
      }
    },
    "668ad4": {
      name: "Man. City",
      player: {
        ad8: "Player1",
        ad8d8: "Player3",
        add8: "Player1",
        afd8d8: "Player3",
        afd8: "Player1",
        ad8fd8: "Player3",
        ada8: "Player1",
        ada8d8: "Player3",
        adas8: "Player1",
        ad8sd8: "Player3",
        adasd8: "Player1",
        afd8asd8: "Player3",
        afdd8: "Player1",
        ad8fdd8: "Player3",
        adad8: "Player1",
        asdda8d8: "Player3"
      }
    },
    "66a84c": {
      name: "What Eves.",
      player: {
        ad8: "Player1",
        ad8d8: "Player3",
        add8: "Player1",
        afd8d8: "Player3",
        afd8: "Player1",
        ad8fd8: "Player3",
        ada8: "Player1",
        ada8d8: "Player3",
        adas8: "Player1",
        ad8sd8: "Player3",
        adasd8: "Player1",
        afd8asd8: "Player3",
        afdd8: "Player1",
        ad8fdd8: "Player3",
        adad8: "Player1",
        asdda8d8: "Player3"
      }
    },
    "6a8dcd": {
      name: "Man. City",
      player: {
        ad8: "Player1",
        ad8d8: "Player3",
        add8: "Player1",
        afd8d8: "Player3",
        afd8: "Player1",
        ad8fd8: "Player3",
        ada8: "Player1",
        ada8d8: "Player3",
        adas8: "Player1",
        ad8sd8: "Player3",
        adasd8: "Player1",
        afd8asd8: "Player3",
        afdd8: "Player1",
        ad8fdd8: "Player3",
        adad8: "Player1",
        asdda8d8: "Player3"
      }
    },
    "66da88": {
      name: "What Eves.",
      player: {
        ad8: "Player1",
        ad8d8: "Player3",
        add8: "Player1",
        afd8d8: "Player3",
        afd8: "Player1",
        ad8fd8: "Player3",
        ada8: "Player1",
        ada8d8: "Player3",
        adas8: "Player1",
        ad8sd8: "Player3",
        adasd8: "Player1",
        afd8asd8: "Player3",
        afdd8: "Player1",
        ad8fdd8: "Player3",
        adad8: "Player1",
        asdda8d8: "Player3"
      }
    }
  };
  let selectedTeam: undefined | keyof typeof teams;
</script>
<h1 class="text-5xl font-bold flex justify-center pt-10">Profile</h1>
<div class="m-5 bg-gray-200">
  <h2 class="text-3xl flex justify-center pt-10">Team</h2>
  {#each Object.keys(teams) as teamID}
    <button on:click={() => selectedTeam = teamID}
            class="block flex justify-start w-full p-3 bg-stone-400 mt-2">{teams[teamID].name}</button>
  {/each}
  <Drawer open={selectedTeam !== undefined} placement="bottom" size="100%">
    <div class="h-screen w-screen absolute z-40" on:click={()=>selectedTeam = undefined}>
    </div>
    <div class="flex justify-center">

      <div class="bg-white rounded-3xl py-5 px-10 max-h-96 z-50 hide-scroll-bar overflow-auto mt-36 items-center">
        <h1 class="text-2xl">Players</h1>
        <div class="mt-2 space-y-2">
          {#if (selectedTeam)}
            {#each Object.keys(teams[selectedTeam].player) as playerID}
              <a on:click={() => selectedTeam = undefined} href={"/profile/player/" + playerID}
                 class="p-2 w-52 bg-gray-200  block cursor-pointer">{teams[selectedTeam].player[playerID]}</a>
            {/each}
          {/if}
        </div>
      </div>
    </div>
  </Drawer>
</div>
<style>
    .hide-scroll-bar {
        -ms-overflow-style: none; /* Internet Explorer 10+ */
        scrollbar-width: none; /* Firefox */
    }

    .hide-scroll-bar::-webkit-scrollbar {
        display: none; /* Safari and Chrome */
    }

</style>