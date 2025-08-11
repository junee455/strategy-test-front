import type { CharacterGameEvent, GameEvent, GameState } from '../interfaces/GameState';

export type MoveGameEventPayload = {
	from: [number, number];
	to: [number, number];
	speed: number;
} & CharacterGameEvent;

export type MoveGameEvent = GameEvent<'move', MoveGameEventPayload>;

export function onMoveEvent(ev: MoveGameEvent, gameState: GameState) {
	const char = gameState.characters.find((c) => c.id === ev.payload.id);

	if (!char) {
		return;
	}

	char.position = ev.payload.to;
	// console.log('move event', ev);
	// console.log(gameState);
}
