<script lang="ts">
	let secondaryColor = '#F5F5F7'; // do not use rgba() - not working in Safari on iOS 11
	let primaryColor = '#EBECEF';
	let speed = 2;
	let animate = true;
	let secondaryColorPercentWidth = 100;
	let ariaLabel: string | null | undefined = null;

	let idClip = getUniqueId();
	let idGradient = getUniqueId();

	function getUniqueId() {
		return Math.random().toString(36).substring(2);
	}
</script>

<svg
	width="100%"
	height="75px"
	aria-label={ariaLabel}
	preserveAspectRatio="none"
	class="mt-2 page-padding"
>
	<rect
		fill="url(#{idGradient})"
		clip-path="url(#{idClip})"
		width="100%"
		height="75px"
		x="0"
		y="0"
	/>
	<defs>
		<clipPath id={idClip}>
			<rect class="img" height="72" x="0" y="0" rx="12" ry="12" />
			<rect class="line1" height="10" x="108" y="19" rx="5" ry="5" />
			<rect class="line2" height="10" x="108" y="43" rx="5" ry="5" />
		</clipPath>
		<linearGradient id={idGradient} x1="-{secondaryColorPercentWidth}%" y1="50%" x2="0%" y2="50%">
			{#if animate}
				<animate
					attributeName="x1"
					from="-{secondaryColorPercentWidth}%"
					to="100%"
					dur="{speed}s"
					repeatCount="indefinite"
				/>
				<animate
					attributeName="x2"
					from="0%"
					to="{100 + secondaryColorPercentWidth}%"
					dur="{speed}s"
					repeatCount="indefinite"
				/>
			{/if}

			<stop stop-color={primaryColor} offset="0%" />
			<stop stop-color={secondaryColor} offset="50%" />
			<stop stop-color={primaryColor} offset="100%" />
		</linearGradient>
	</defs>
</svg>

<style>
	.img {
		@apply object-cover w-24 pt-2;
	}
	.line1 {
		@apply rounded-xl;
		width: 70%;
	}
	.line2 {
		@apply rounded-xl;
		width: 35%;
	}
	@media (min-width: 700px) {
		.line1 {
			width: 500px;
		}
	}
</style>
