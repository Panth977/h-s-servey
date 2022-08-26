<script context="module" lang="ts">
  interface Stats {
    name: string;
    m: number;
    g: number;
    a: number;
    y: number;
    r: number;
  }

  interface PlayerStats extends Stats {
    playerID: string;
  }

  const data: { [playerID: string]: Stats } = {
    "d5v4s": { name: "Devaesh Joshi", m: 5, g: 20, a: 5, y: 5, r: 2 },
    "da68d": { name: "Spandan Mehta", m: 2, g: 16, a: 21, y: 6, r: 8 },
    "da5v4": { name: "Spandan Mehta", m: 5, g: 21, a: 15, y: 5, r: 2 },
    "ad93c": { name: "Spandan Mehta", m: 2, g: 16, a: 21, y: 6, r: 8 },
    "68ad4": { name: "Devaesh Joshi", m: 5, g: 2, a: 15, y: 5, r: 2 },
    "6a84c": { name: "Spandan Mehta", m: 2, g: 6, a: 21, y: 6, r: 8 },
    "a8dcd": { name: "Devaesh Joshi", m: 5, g: 16, a: 15, y: 5, r: 2 },
    "6da88": { name: "Spandan Mehta", m: 2, g: 20, a: 21, y: 6, r: 8 },
    "9d5v4s": { name: "Devaesh Joshi", m: 5, g: 20, a: 5, y: 5, r: 2 },
    "9da68d": { name: "Spandan Mehta", m: 2, g: 16, a: 21, y: 6, r: 8 },
    "9da5v4": { name: "Devaesh Joshi", m: 5, g: 21, a: 26, y: 5, r: 2 },
    "9ad93c": { name: "Spandan Mehta", m: 2, g: 16, a: 21, y: 6, r: 8 },
    "968ad4": { name: "Devaesh Joshi", m: 5, g: 2, a: 15, y: 5, r: 2 },
    "96a84c": { name: "Spandan Mehta", m: 2, g: 6, a: 21, y: 6, r: 8 },
    "9a8dcd": { name: "Devaesh Joshi", m: 5, g: 16, a: 15, y: 5, r: 2 },
    "96da88": { name: "Spandan Mehta", m: 2, g: 20, a: 21, y: 6, r: 8 }
  };

  export const allPlayerStats = Object.keys(data)
    .map<PlayerStats>(playerID => ({ playerID, ...data[playerID] }))
    .sort((x, y) => x.g == y.g ? y.a - x.a : y.g - x.g);
</script>
<table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
  <thead
    class="text-xs sticky top-16 text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
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
  {#each allPlayerStats as playerStats, i}
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