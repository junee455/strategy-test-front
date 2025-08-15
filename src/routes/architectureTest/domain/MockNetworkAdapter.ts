import type { SpawnGameEvent } from './eventHandlers';
import type { ChangeHpEvent } from './eventHandlers/onChangeHp';
import type { MoveGameEvent } from './eventHandlers/onMoveEvent';
import type { RecieveDamageEvent } from './eventHandlers/onRecieveDamage';
import type { GameEvent, GameEventListener } from './interfaces/GameState';
import type { IGameEventsSource } from './interfaces/IGameEventsEmitter';
import { Subject } from 'rxjs';

async function wait(ms: number) {
	return await new Promise((r) => {
		setTimeout(() => {
			r(0);
		}, ms);
	});
}

export class MockNetworkAdapter implements IGameEventsSource {
	private testData: Subject<GameEvent> = new Subject();

	private lastId = 0;

	private getNextId() {
		this.lastId++;

		return `${this.lastId}`;
	}

	private timeStart = Date.now();

	private getTime() {
		return Date.now() - this.timeStart;
	}

	constructor() {
		setTimeout(async () => {
			await this.initCharacters();

			await wait(500);

			this.sniperMove();

			await wait(1000);

			this.reduceBloodseekerHp();

			await wait(500);

			this.reduceSniperHp();
		}, 0);
	}

	private async initCharacters() {
		await wait(300);

		this.testData.next({
			type: 'spawn',
			tick: this.getTime(),
			payload: {
				characterId: 'bloodseeker',
				id: '0'
			}
		} as SpawnGameEvent);

		await wait(300);

		this.testData.next({
			type: 'spawn',
			tick: this.getTime(),
			payload: {
				characterId: 'sniper',
				id: '1'
			}
		} as SpawnGameEvent);
	}

	private async reduceBloodseekerHp() {
		this.testData.next({
			type: 'recieveDamage',
			tick: this.getTime(),
			payload: {
				damage: 30,
				hpLeft: 70,
				id: '0'
			}
		} as RecieveDamageEvent);
	}

	private sniperMove() {
		this.testData.next({
			type: 'move',
			tick: this.getTime(),
			payload: {
				id: '1',
				from: [0, 0],
				to: [1, 2],
				speed: 1
			}
		} as MoveGameEvent);
	}

	private async reduceSniperHp() {
		this.testData.next({
			type: 'recieveDamage',
			tick: this.getTime(),
			payload: {
				damage: 20,
				hpLeft: 80,
				id: '1'
			}
		} as RecieveDamageEvent);
	}

	subscribe(sub: GameEventListener) {
		return this.testData.subscribe(sub);
	}
}
