import type { CharacterGameEvent, GameEvent, GameState } from '../interfaces/GameState';

export type ChangeHpEventPayload = {
	hp: number;
} & CharacterGameEvent;

export type ChangeHpEvent = GameEvent<'changeHp', ChangeHpEventPayload>;

export function onChangeHp(ev: ChangeHpEvent, gameState: GameState) {
	const payload = ev.payload;

	const target = gameState.characters.find((c) => (c.id === payload.id));

	if (!target) {
		return;
	}

	target.health = payload.hp;
}
