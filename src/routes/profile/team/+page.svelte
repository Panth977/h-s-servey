<script lang="ts">
  const teams: { [teamID: string]: string } = {
    "d5v4s": "Man. City",
    "da68d": "What Eves.",
    "da5v4": "What Eves.",
    "ad93c": "What Eves.",
    "68ad4": "Man. City",
    "6a84c": "What Eves.",
    "a8dcd": "Man. City",
    "6da88": "What Eves.",
    "6d5v4s": "Man. City",
    "6da68d": "What Eves.",
    "6da5v4": "Man. City",
    "6ad93c": "What Eves.",
    "668ad4": "Man. City",
    "66a84c": "What Eves.",
    "6a8dcd": "Man. City",
    "66da88": "What Eves."
  };
</script>
<h1 class="text-5xl font-bold text-center mt-10">Profile</h1>
<div class="m-5 bg-gray-200 pt-10">
  <h2 class="text-3xl text-center">Team</h2>
  {#each Object.keys(teams) as teamID}
    <a href={"/profile/team/" + teamID} class="block p-3 bg-stone-400 mt-2">{teams[teamID]}</a>
  {/each}
</div>
