import type { Character } from './Character';

export type GameEventTypes =
	| 'move'
	| 'changeHp'
	| 'changeMana'
	| 'attack'
	| 'recieveDamage'
	| 'spawn'
	| 'unspecified';

export type GameState = {
	eventsCount: number;
	characters: Character[];
};

export interface GameEvent<T extends GameEventTypes | unknown = unknown, P = unknown> {
	type: T;
	tick: number;
	payload: P;
}

export interface CharacterGameEvent {
	id: string;
}

export type GameEventListener<T extends GameEventTypes | unknown = unknown> = (
	update: GameEvent<T>
) => void;
