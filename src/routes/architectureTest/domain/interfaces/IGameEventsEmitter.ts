import type { GameEventListener } from './GameState';

export interface IGameEventsSource {
	subscribe: (listener: GameEventListener) => void;
}
