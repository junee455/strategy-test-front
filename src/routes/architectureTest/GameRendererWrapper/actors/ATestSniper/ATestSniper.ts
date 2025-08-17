import type { Renderer3D } from '../../../3dRenderer';
import type { Actor, ActorBaseConfig } from '../../../3dRenderer/classes/actor';
import type { TickContext } from '../../../3dRenderer/types';
import type { AttackEvent } from '../../../domain/eventHandlers/onAttack';
import type { MoveGameEvent } from '../../../domain/eventHandlers/onMoveEvent';
import type { RecieveDamagePayload } from '../../../domain/eventHandlers/onRecieveDamage';
import { lerpOverTime } from '../../../utils';
import { testSpawnCube } from '../../utils/testSpawnCube';
import { ACharacterAbstract, type ACharacterStats } from '../ACharacterAbstract';
import { ABullet } from '../BulletActor/ABullet';
import * as THREE from 'three';
import { lerp } from 'three/src/math/MathUtils.js';

const GUN_COLOR = '#7b5a61';
const BODY_COLOR = '#e14734';
const SKIN_COLOR = '#d89b9b';
const HOOD_COLOR = '#426980';

export class ATestSniper extends ACharacterAbstract<{
	initialStats: ACharacterStats;
}> {
	public statsPosition3D: THREE.Vector3 = new THREE.Vector3(0, 2, 0);

	public projectiles: ABullet[] = [];

	private gunMesh: THREE.Object3D;

	constructor(baseConfig: ActorBaseConfig, config?: void) {
		super(baseConfig, {
			initialStats: {
				name: 'sniper',
				health: 100,
				mana: 100,

				maxHealth: 100,
				maxMana: 100
			}
		});

		const gun = testSpawnCube(GUN_COLOR, [0.2, 0.4, 1.5]);

		this.gunMesh = gun;

		gun.translateX(-0.5);

		const head = testSpawnCube(SKIN_COLOR, [0.4, 0.5, 0.4]);

		head.translateY(1);

		const body = testSpawnCube(BODY_COLOR, [0.8, 1, 0.5]);

		const hood = testSpawnCube(HOOD_COLOR, [1, 1.2, 0.2]);

		hood.translateZ(-0.25);

		this.root.add(gun, head, body, hood);
	}

	private spawnProjectile() {
		const newProjectile = this.baseConfig.renderer3d.spawnFromClass(ABullet) as ABullet;
		this.projectiles.push(newProjectile);

		return newProjectile;
	}

	onMoveEnd(ev: MoveGameEvent): void {}

	onMoveStart(ev: MoveGameEvent): void {
		this.rotateTowardsWorldPosition(new THREE.Vector3(ev.payload.to[0], 0, ev.payload.to[1]));
	}

	onAttack(ev: AttackEvent, targetActor: Actor<void>): void {
		this.rotateTowardsWorldPosition(targetActor.root.position);
		const newProjectile = this.spawnProjectile();

		const projectileStartPositin = new THREE.Vector3();

		this.gunMesh.getWorldPosition(projectileStartPositin);

		newProjectile.root.position.copy(projectileStartPositin);

		// newProjectile.follow(targetActor, ev.payload.projectileSpeed || 100);
		newProjectile.follow(targetActor, 10);
	}

	onTick(t: TickContext): void {
		// this.root.rotateY(t.dt);
		this.updateStatsProjection();
	}

	override recieveDamage(ev: RecieveDamagePayload): void {
		super.recieveDamage(ev);

		lerpOverTime(0, 1, 100, lerp, (v) => {
			let yScale: number;

			if (v < 0.5) {
				yScale = 1 - v;
			} else {
				yScale = v;
			}

			this.root.scale.set(1, yScale, 1);
		});
	}
}
