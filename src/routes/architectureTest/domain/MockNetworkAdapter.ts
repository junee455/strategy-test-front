import { distance2d } from '../utils';
import type { SpawnGameEvent } from './eventHandlers';
import type { AttackEvent } from './eventHandlers/onAttack';
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

	charPositions = {
		'0': [0, 0] as [number, number],
		'1': [1, 1] as [number, number]
	};

	constructor() {
		setTimeout(async () => {
			await this.initCharacters();

			await wait(500);

			this.initSniperActionsLoop();
			this.initRandomMove('1');

			await wait(1000);

			this.reduceBloodseekerHp();

			await wait(500);

			this.reduceSniperHp();
		}, 0);
	}

	private async initSniperActionsLoop() {
		const charId = '0';

		const randomTo = [Math.random() * 10 - 5, Math.random() * 10 - 5] as [number, number];

		const distance = distance2d(this.charPositions[charId], randomTo);

		const speed = Math.random() * 3 + 1;

		const time = (distance / speed) * 1000 + 300;

		console.log('sniper start move');

		this.charMove(charId, this.charPositions[charId], randomTo, speed);

		this.charPositions[charId] = randomTo;

		await wait(time);

		console.log('sniper end move');

		console.log('sniper attack');

		this.testData.next({
			type: 'attack',
			tick: this.getTime(),
			payload: {
				attackType: 'range',
				projectileSpeed: 100,
				damage: 10,
				id: '0',
				targetId: '1'
				// characterId: 'sniper',
				// id: '1'
			}
		} as AttackEvent);

		await wait(1000);

		console.log('sniper loop end ~~~~~~~~');


		setTimeout(async () => this.initSniperActionsLoop(), 0);
	}

	private initRandomMove(charId: '0' | '1') {
		const randomTo = [Math.random() * 10 - 5, Math.random() * 10 - 5] as [number, number];

		const distance = distance2d(this.charPositions[charId], randomTo);

		const speed = Math.random() * 3 + 1;

		const time = (distance / speed) * 1000 + 300;

		this.charMove(charId, this.charPositions[charId], randomTo, speed);

		this.charPositions[charId] = randomTo;

		setTimeout(() => this.initRandomMove(charId), time);
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

	private charMove(id: string, from: [number, number], to: [number, number], speed: number) {
		this.testData.next({
			type: 'move',
			tick: this.getTime(),
			payload: {
				id: id,
				from,
				to,
				speed
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
