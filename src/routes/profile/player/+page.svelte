<script lang="ts">
  import Modal from "../../../lib/Modal.svelte";

  const teams: { [teamID: string]: { name: string; player: { [playerID: string]: string } } } = {
    d5v4s: {
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
    da68d: {
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
    da5v4: {
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
    ad93c: {
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
    a8dcd: {
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
  let selectedTeam: undefined | string;
</script>

<h1 class="text-5xl font-bold text-center pt-10">Profile</h1>
<div class="m-5 bg-gray-200">
  <h2 class="text-3xl text-center pt-10">Team</h2>
  {#each Object.keys(teams) as teamID}
    <button
      on:click={() => (selectedTeam = teamID)}
      class="text-start w-full p-3 bg-stone-400 mt-2"
    >
      {teams[teamID].name}
    </button>
  {/each}
  <Modal close={() => (selectedTeam = undefined)} open={selectedTeam !== undefined} title="Players">
    <div class="mt-2 space-y-2">
      {#if (selectedTeam !== undefined)}
        {#each Object.keys(teams[selectedTeam].player) as playerID}
          <a
            on:click={() => (selectedTeam = undefined)}
            href={'/profile/player/' + playerID}
            class="p-2 w-52 bg-gray-200  block cursor-pointer"
          >{teams[selectedTeam].player[playerID]}</a
          >
        {/each}
      {/if}
    </div>
  </Modal>
</div>

