<script context="module" lang="ts">
	export interface ShareInfo {
		path: string;
		title?: string;
	}
</script>

<script lang="ts">
	export let share: ShareInfo;
	function shareUrl() {
		if (!navigator.share) return;
		navigator.share({
			url: `https://${window.location.host}${share?.path}`,
			title: share.title
		});
	}
</script>

<svg
	on:click={shareUrl}
	width="22"
	height="20"
	viewBox="0 0 22 20"
	fill="none"
	xmlns="http://www.w3.org/2000/svg"
>
	<path
		d="M11 1V13M11 1L7 5M11 1L15 5M1 15L1.621 17.485C1.72915 17.9177 1.97882 18.3018 2.33033 18.5763C2.68184 18.8508 3.11501 18.9999 3.561 19H18.439C18.885 18.9999 19.3182 18.8508 19.6697 18.5763C20.0212 18.3018 20.2708 17.9177 20.379 17.485L21 15"
		stroke="white"
		stroke-width="2"
		stroke-linecap="round"
		stroke-linejoin="round"
	/>
</svg>
