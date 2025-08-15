import type { CharacterGameEvent, GameEvent, GameState } from '../interfaces/GameState';

export type AttackEventPayload = {
	targetId: string;
	damage: number;
	attackType: any;
	projectileSpeed?: number;
} & CharacterGameEvent;

export type AttackEvent = GameEvent<'attack', AttackEventPayload>;

export function onAttack(ev: AttackEvent, gameState: GameState) {}
