<script context="module" lang="ts">
  interface Stats {
    name: string;
    m: number;
    w: number;
    l: number;
    p: number;
    gs: number;
    gc: number;
    gd: number;
  }

  interface TeamStats extends Stats {
    teamID: string;
  }

  const data: { [teamID: string]: Stats } = {
    "d5v4s": { name: "Man. City", m: 5, w: 20, l: 5, p: 5, gs: 2, gc: 2, gd: 2 },
    "da68d": { name: "What Eves.", m: 2, w: 16, l: 21, p: 6, gs: 8, gc: 8, gd: 8 },
    "da5v4": { name: "What Eves.", m: 5, w: 21, l: 15, p: 5, gs: 2, gc: 2, gd: 2 },
    "ad93c": { name: "What Eves.", m: 2, w: 16, l: 21, p: 6, gs: 8, gc: 8, gd: 8 },
    "68ad4": { name: "Man. City", m: 5, w: 2, l: 15, p: 5, gs: 2, gc: 2, gd: 2 },
    "6a84c": { name: "What Eves.", m: 2, w: 6, l: 21, p: 6, gs: 8, gc: 8, gd: 8 },
    "a8dcd": { name: "Man. City", m: 5, w: 16, l: 15, p: 5, gs: 2, gc: 2, gd: 2 },
    "6da88": { name: "What Eves.", m: 2, w: 20, l: 21, p: 6, gs: 8, gc: 8, gd: 8 },
    "9d5v4s": { name: "Man. City", m: 5, w: 20, l: 5, p: 5, gs: 2, gc: 2, gd: 2 },
    "9da68d": { name: "What Eves.", m: 2, w: 16, l: 21, p: 6, gs: 8, gc: 8, gd: 8 },
    "9da5v4": { name: "Man. City", m: 5, w: 21, l: 26, p: 5, gs: 2, gc: 2, gd: 2 },
    "9ad93c": { name: "What Eves.", m: 2, w: 16, l: 21, p: 6, gs: 8, gc: 8, gd: 8 },
    "968ad4": { name: "Man. City", m: 5, w: 2, l: 15, p: 5, gs: 2, gc: 2, gd: 2 },
    "96a84c": { name: "What Eves.", m: 2, w: 6, l: 21, p: 6, gs: 8, gc: 8, gd: 8 },
    "9a8dcd": { name: "Man. City", m: 5, w: 16, l: 15, p: 5, gs: 2, gc: 2, gd: 2 },
    "96da88": { name: "What Eves.", m: 2, w: 20, l: 21, p: 6, gs: 8, gc: 8, gd: 8 }
  };

  export const allTeamStats = Object.keys(data)
    .map<TeamStats>(teamID => ({ teamID, ...data[teamID] }))
    .sort((x, y) => x.w == y.w ? y.w - x.w : y.l - x.l);
</script>
<table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
  <thead
    class="text-xs sticky top-16 text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
  <tr>
    <th class="py-3 px-6" scope="col">Pos</th>
    <th class="py-3 px-6" scope="col">Team</th>
    <th class="py-3 px-6" scope="col">M</th>
    <th class="py-3 px-6" scope="col">W</th>
    <th class="py-3 px-6" scope="col">L</th>
    <th class="py-3 px-6" scope="col">P</th>
    <th class="py-3 px-6" scope="col">GS</th>
    <th class="py-3 px-6" scope="col">GC</th>
    <th class="py-3 px-6" scope="col">GD</th>
  </tr>
  </thead>
  <tbody>
  {#each allTeamStats as teamStats, i}
    <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
      <td class="py-4 px-6">{i + 1}</td>
      <th class="py-4 px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white"
          scope="row"><a href={"/profile/team/" + teamStats.teamID}>{teamStats.name}</a></th>
      <td class="py-4 px-6">{teamStats.m}</td>
      <td class="py-4 px-6">{teamStats.w}</td>
      <td class="py-4 px-6">{teamStats.l}</td>
      <td class="py-4 px-6">{teamStats.p}</td>
      <td class="py-4 px-6">{teamStats.gs}</td>
      <td class="py-4 px-6">{teamStats.gc}</td>
      <td class="py-4 px-6">{teamStats.gd}</td>
    </tr>
  {/each}
  </tbody>
</table>