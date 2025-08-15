<script lang="ts">
	import { canvasSize } from '../../../gameState.svelte';

	const width = 100;
	
	export interface StatsRendererProps {
		name: string;
		health: number;
		mana: number;

		maxHealth: number;
		maxMana: number;

		renderName?: boolean;

		position: [number, number, number];
	}

	const { name, health, mana, maxHealth, maxMana, position }: StatsRendererProps = $props();
</script>

<div
	class="StatsRendererComponent"
	style={`
top: ${canvasSize[1] / 2 - (position[1] * canvasSize[1]) / 2}px;
left: ${(position[0] * canvasSize[0]) / 2 + canvasSize[0] / 2}px;
`}
>
	<div class="name">{name}</div>
	<div
		class="health"
		style={`
	width: ${(width * health) / maxHealth}px;
	`}
	>
		{health}
	</div>
	<div
		class="mana"
		style={`
	width: ${(width * mana) / maxMana}px;
	`}
	>
		{mana}
	</div>
</div>

<style lang="scss">
	@use './StatsRenderer.scss';
</style>
