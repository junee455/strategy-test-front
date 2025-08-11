import { distance2d, lerpArr2, lerpOverTime } from '../utils';
import { eventToListenerMapping, type SpawnGameEvent } from './eventHandlers';
import { getCharacterDescription } from './eventHandlers/characters';
import type { MoveGameEvent } from './eventHandlers/onMoveEvent';
import type {
	GameEvent,
	GameEventListener,
	GameEventTypes,
	GameState
} from './interfaces/GameState';
import type { IGameEventsSource } from './interfaces/IGameEventsEmitter';
import { Subject } from 'rxjs';

export class Subscription {
	constructor() {}

	public unsubscribe() {}
}

export const initialGameState = {
	eventsCount: 0,
	characters: []
};

export class GameStateManager {
	public updateTick: Subject<void> = new Subject();

	public state: GameState = structuredClone(initialGameState);

	public eventLog: GameEvent[] = [];

	public onSpawnCharacter(eventPayload: SpawnGameEvent['payload']) {
		const description = getCharacterDescription(eventPayload.characterId);

		if (!description) {
			return;
		}

		this.state.characters.push({
			...description,
			id: eventPayload.id,
			effects: [],
			position: [0, 0]
		});
	}

	constructor(public mainEventsSource: IGameEventsSource) {
		this.mainEventsSource.subscribe((event) => {
			this.eventLog.push(event);

			this.state.eventsCount++;

			this.updateTick.next();

			if ((event.type as GameEventTypes) === 'spawn') {
				const payload = (event as SpawnGameEvent).payload;

				this.onSpawnCharacter(payload);
			} else if ((event as MoveGameEvent).type === 'move') {
				const payload = (event as MoveGameEvent).payload;

				const char = this.state.characters.find((c) => c.id === payload.id);

				if (!char) {
					return;
				}

				const fromToDistance = distance2d(payload.from, payload.to);

				const onPosUpdate = (pos: [number, number]) => {
					char.position = pos;

					this.updateTick.next();
				};

				lerpOverTime(
					payload.from,
					payload.to,
					(1000 * fromToDistance) / payload.speed,
					lerpArr2,
					onPosUpdate
				);
				// start move timer
				// lerpOverTime()
			} else {
				// @ts-expect-error the value is function
				eventToListenerMapping[event.type as GameEventTypes]?.(event, this.state);
			}
		});
	}

	subscribe(sub: GameEventListener) {
		return this.mainEventsSource.subscribe(sub);
	}
}
