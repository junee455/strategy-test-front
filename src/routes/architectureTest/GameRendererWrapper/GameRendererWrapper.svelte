<script lang="ts">
	import { canvasSize, gameState, gameStateManager } from '../gameState.svelte';
	import { GameRenderer } from './GameRenderer';
	import { ATestBloodseeker } from './actors/ATestBloodseeker/ATestBloodseeker';
	import { ATestCube } from './actors/ATestCube/ATestCube';
	import StatsRenderer, {
		type StatsRendererProps
	} from './components2D/StatsRenderer/StatsRenderer.svelte';
	import { getCharacterActorClass } from './utils';
	import { onMount } from 'svelte';

	let canvasEl: HTMLCanvasElement;

	let gameRenderer = $state<GameRenderer>();

	let statsToRender = $state<
		{ id: string; payload: { position: [number, number, number] } & StatsRendererProps }[]
	>([]);

	onMount(() => {
		gameRenderer = new GameRenderer(canvasEl, gameStateManager.mainEventsSource);

		canvasSize[0] = gameRenderer.renderer3d.canvasEl.width;
		canvasSize[1] = gameRenderer.renderer3d.canvasEl.height;

		gameRenderer.renderer3d.addCallback((c) => {
			statsToRender = gameRenderer?.renderer3d.uiRegistry || [];
		});
	});
</script>

<div class="GameRendererWrapper">
	<canvas class="mainCanvas" bind:this={canvasEl}></canvas>

	<div class="components2dContainer">
		{#each statsToRender as statPiece (statPiece.id)}
			<StatsRenderer {...statPiece.payload}></StatsRenderer>
		{/each}
	</div>
</div>

<style lang="scss">
	@use './GameRendererWrapper.scss';
</style>
