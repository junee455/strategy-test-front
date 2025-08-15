import type { GameEvent, GameEventTypes, GameState } from '../interfaces/GameState';
import { onChangeHp } from './onChangeHp';
import { onMoveEvent } from './onMoveEvent';
import { onRecieveDamage } from './onRecieveDamage';

export function validateEvent(ev: GameEvent<unknown>, gameState: GameState) {
	console.log('unknown event', ev);
	console.log(gameState);
}

export const eventToListenerMapping: {
	[key in GameEventTypes]?: unknown;
} = {
	move: onMoveEvent,
	changeHp: onChangeHp,
	recieveDamage: onRecieveDamage
} as const;

export * from './onSpawn';
