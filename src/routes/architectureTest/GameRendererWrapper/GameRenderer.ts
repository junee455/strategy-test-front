import { Renderer3D } from '../3dRenderer';
import type { Actor } from '../3dRenderer/classes/actor';
import type { RegisteredActors } from '../3dRenderer/types';
import type { SpawnGameEvent } from '../domain/eventHandlers';
import type { KnownCharacterIds } from '../domain/eventHandlers/characters';
import type { AttackEvent } from '../domain/eventHandlers/onAttack';
import type { ChangeHpEvent } from '../domain/eventHandlers/onChangeHp';
import type { MoveGameEvent } from '../domain/eventHandlers/onMoveEvent';
import type { RecieveDamageEvent } from '../domain/eventHandlers/onRecieveDamage';
import type { IGameEventsSource } from '../domain/interfaces/IGameEventsEmitter';
import type { IGameRenderer } from '../domain/interfaces/IGameRenderer';
import { distance2d, lerpArr2, lerpOverTime } from '../utils';
import { getCharacterActorClass, type KnownCharacterTypes } from './utils';

export class GameRenderer implements IGameRenderer {
	public renderer3d: Renderer3D;

	public characters: KnownCharacterTypes[] = [];

	public objects: Actor<any>[] = [];

	constructor(
		canvasEl: HTMLCanvasElement,
		public mainEventsSource: IGameEventsSource
	) {
		this.renderer3d = new Renderer3D({
			canvasEl,
			targetFps: 60
		});

		this.renderer3d.camera.translateZ(20);

		const findTargetCharacter = (upd: { id: string }) => {
			return this.characters.find((c) => c.id === upd.id);
		};

		this.mainEventsSource.subscribe((upd) => {
			if ((upd as SpawnGameEvent).type === 'spawn') {
				const { payload } = upd as SpawnGameEvent;

				this.spawnCharacter(payload.characterId, payload.id);
			} else if ((upd as MoveGameEvent).type === 'move') {
				const { payload } = upd as MoveGameEvent;

				const char = findTargetCharacter(payload);

				if (!char) {
					return;
				}

				const distanceFromTo = distance2d(payload.from, payload.to);

				lerpOverTime(
					payload.from,
					payload.to,
					(distanceFromTo / payload.speed) * 1000,
					lerpArr2,
					(v, dt) => {
						char.root.position.set(v[0], 0, v[1]);

						if (dt === 1) {
							char.onMoveEnd(upd as MoveGameEvent);
						}
					}
				);

				char.onMoveStart(upd as MoveGameEvent);
			} else if ((upd as ChangeHpEvent).type === 'changeHp') {
				const { payload } = upd as ChangeHpEvent;

				const char = findTargetCharacter(payload);

				if (!char) {
					return;
				}

				char.stats.health = payload.hp;
			} else if ((upd as RecieveDamageEvent).type === 'recieveDamage') {
				const { payload } = upd as RecieveDamageEvent;

				const char = findTargetCharacter(payload);

				if (!char) {
					return;
				}

				char.recieveDamage(payload);
			} else if ((upd as AttackEvent).type === 'attack') {
				const { payload } = upd as AttackEvent;

				const char = findTargetCharacter({ id: payload.id });

				if (!char) {
					return;
				}

				const targetChar = findTargetCharacter({ id: payload.targetId });

				if (!targetChar) {
					return;
				}

				targetChar.onAttack(upd as AttackEvent, [
					targetChar.root.position.x,
					targetChar.root.position.z
				]);
				// const targetLocation =
			}
		});
	}

	public spawnFromClass(c: RegisteredActors, id: string, config?: any) {
		const obj = new c(
			{
				renderer3d: this.renderer3d
			},
			config
		);

		obj.id = id;

		this.objects.push(obj);

		this.renderer3d.addActor(obj);

		return obj;
	}

	public spawnCharacter(charId: KnownCharacterIds, id: string) {
		const classChar = getCharacterActorClass(charId);

		if (!classChar) {
			return;
		}

		const char = this.spawnFromClass(classChar, id);

		this.characters.push(char);
	}
}
