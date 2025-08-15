import type { CharacterGameEvent, GameEvent, GameState } from '../interfaces/GameState';

export type RecieveDamagePayload = {
	attackerId: string;
	hpLeft: number;
	damage: number;
} & CharacterGameEvent;

export type RecieveDamageEvent = GameEvent<'recieveDamage', RecieveDamagePayload>;

export function onRecieveDamage(ev: RecieveDamageEvent, gameState: GameState) {
	const char = gameState.characters.find((c) => c.id === ev.payload.id);

	if (!char) {
		return;
	}

	char.health = ev.payload.hpLeft;
}
