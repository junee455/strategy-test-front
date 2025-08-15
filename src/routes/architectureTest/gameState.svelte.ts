import { GameStateManager, initialGameState } from './domain/GameStateManager';
import { MockNetworkAdapter } from './domain/MockNetworkAdapter';
import type { GameEvent, GameState } from './domain/interfaces/GameState';

export const canvasSize = $state([0, 0]);

const gameState = $state<{ state: GameState; eventLog: GameEvent[] }>({
	state: initialGameState,
	eventLog: []
});

const networkAdapter = new MockNetworkAdapter();

const gameStateManager = new GameStateManager(networkAdapter);

// const gameRenderer = new GameRenderer()
gameStateManager.updateTick.subscribe(() => {
	gameState.state = gameStateManager.state;
	gameState.eventLog = gameStateManager.eventLog;
});

// gameStateManager.subscribe(() => {
// 	gameState.state = gameStateManager.state;
// 	gameState.eventLog = gameStateManager.eventLog;
// });

export { gameState, gameStateManager };
