<script lang="ts">
	import { gameState, gameStateManager } from '../gameState.svelte';
	import { GameRenderer } from './GameRenderer';
	import { onMount } from 'svelte';

	let canvasEl: HTMLCanvasElement;

	onMount(() => {
		const renderer3d = new GameRenderer(canvasEl, gameStateManager.mainEventsSource);

		// gameStateManager.updateTick.subscribe(() => {
		// });
	});
</script>

<div class="GameRendererWrapper">
	<canvas class="mainCanvas" bind:this={canvasEl} />
</div>

<style lang="scss">
	@use './GameRendererWrapper.scss';
</style>
