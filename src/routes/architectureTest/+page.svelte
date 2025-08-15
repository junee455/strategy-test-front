<script lang="ts">
	import GameRendererWrapper from './GameRendererWrapper/GameRendererWrapper.svelte';
	import { gameState } from './gameState.svelte';
</script>

<div class="ArchitectureTest">
	<div class="gameRendrererContainer">
		<GameRendererWrapper />
	</div>

	<div class="eventLog">
		{#each gameState.eventLog as singleEvent, i}
			<div class="logPiece">
				<div>
					<div class="tickNumber">{i}</div>
					<h2>
						{singleEvent.type}
					</h2>
				</div>
				<div>t: {singleEvent.tick}</div>
				<code>{JSON.stringify(singleEvent.payload, null, 2)}</code>
				{#if i < gameState.eventLog.length - 1}
					<div class="divider"></div>
				{/if}
				<div></div>
			</div>
		{/each}
	</div>
</div>

<style lang="scss">
	@use './ArchitectureTest.scss';
</style>
