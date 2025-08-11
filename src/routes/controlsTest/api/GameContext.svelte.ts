// import type
import type { Component, ComponentProps, SvelteComponent } from 'svelte';

export type GameComponent2DProps = {
	destroy: () => void;
};

export type GameComponent2D<ComponentType extends SvelteComponent | Component> = {
	component: ComponentType;
	props: ComponentProps<ComponentType> & GameComponent2DProps;
	id: string;
};

type Component2DArray = GameComponent2D<SvelteComponent | Component>[];

export type GameState = {
	name: 'game';
	counter: number;
	counter2: number;
	components2D: Component2DArray;
};

const defaultGameState: GameState = {
	name: 'game',
	counter: 0,
	counter2: 0,
	components2D: []
};

let components2dCounter = $state(0);

export function buildComponent2D<ComponentType extends SvelteComponent | Component>(
	component: ComponentType,
	props: ComponentProps<ComponentType>
): GameComponent2D<ComponentType> {
	components2dCounter++;

	const id = String(components2dCounter);

	return {
		id,
		component,
		props: {
			...props,
			destroy: () => {
				gameState.components2D = gameState.components2D.filter((c) => c.id !== id);
			}
		}
	};
}

export const gameState = $state<GameState>(JSON.parse(JSON.stringify(defaultGameState)));
