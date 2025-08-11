<script lang="ts" module>
	import type { GameComponent2DProps } from '../api/GameContext.svelte';

	export type ClickDropProps = {
		position: [number, number];
		destroy: () => void;
	} & GameComponent2DProps;
</script>

<script lang="ts">
	const { position, destroy }: ClickDropProps = $props();

	const animationDurationMs = 1000;

	setTimeout(destroy, animationDurationMs);
</script>

<div
	class="ClickDrop-component"
	style={`left: ${position[0]}px; top: ${position[1]}px; animation-duration: ${animationDurationMs}ms;`}
></div>

<style lang="scss">
	@keyframes ClickDrop-component_blink {
		from {
			width: 0px;
			height: 0px;
			opacity: 1;
		}

		to {
			width: 50px;
			height: 50px;
			opacity: 0;
		}
	}

	.ClickDrop-component {
		pointer-events: none;

		animation-name: ClickDrop-component_blink;

		position: absolute;

		background-color: green;

		border-radius: 100px;

		transform: translateX(-50%) translateY(-50%);

		content: '';
	}
</style>
