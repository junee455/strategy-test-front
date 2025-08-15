<script lang="ts">
	import { gameState } from '../../controlsTest/api/GameContext.svelte';

	let checkInputValue = $state<string>();
</script>

<div class="SidePage-page">
	<div>
		Auto counter: {gameState.counter}
	</div>
	<div>
		Counter 2: {gameState.counter2}
	</div>

	<input bind:value={checkInputValue} />

	<div>{checkInputValue}</div>

	<a href="../architectureTest">go back</a>
</div>

<style lang="scss">
	@import '../SidePage.scss';
</style>
