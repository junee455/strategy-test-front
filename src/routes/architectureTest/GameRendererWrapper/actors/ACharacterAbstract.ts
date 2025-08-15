import { Actor, type ActorBaseConfig } from '../../3dRenderer/classes/actor';
import type { AttackEvent } from '../../domain/eventHandlers/onAttack';
import type { MoveGameEvent } from '../../domain/eventHandlers/onMoveEvent';
import type { RecieveDamagePayload } from '../../domain/eventHandlers/onRecieveDamage';
import * as THREE from 'three';

export interface ACharacterStats {
	name: string;
	health: number;
	mana: number;

	maxHealth: number;
	maxMana: number;
}

export abstract class ACharacterAbstract<
	Config extends {
		initialStats: ACharacterStats;
	}
> extends Actor<Config> {
	public statsPosition3D: THREE.Vector3 = new THREE.Vector3();
	public statsPosition2D: THREE.Vector3 = new THREE.Vector3();

	public stats: ACharacterStats;

	constructor(
		protected baseConfig: ActorBaseConfig,
		protected config: Config
	) {
		super(baseConfig, config);

		this.stats = config.initialStats;
	}

	rotateTowardsWorldPosition(rotateTowards: THREE.Vector3) {
		// instant look at
		this.root.lookAt(rotateTowards);

		// const lookAtRotation = new THREE.Matrix4();
		// let forward = new THREE.Vector3(0, 0, 1);

		// forward = forward.applyEuler(this.root.rotation);

		// // forward.rot

		// // forward.transformDirection

		// // forward.
		// // this.root.rotation
		// lookAtRotation.lookAt(rotateTowards.clone().sub(this.root.position), forward, this.root.up);

		// this.root.applyMatrix4(lookAtRotation);
	}

	updateStatsProjection() {
		const statsWorldPosition = this.root.position.clone().add(this.statsPosition3D);

		statsWorldPosition.project(this.baseConfig.renderer3d.camera);

		this.statsPosition2D.copy(statsWorldPosition);

		this.baseConfig.renderer3d.setUiById(this.id, {
			...this.stats,
			position: [this.statsPosition2D.x, this.statsPosition2D.y, this.statsPosition2D.z]
		});
	}

	recieveDamage(ev: RecieveDamagePayload): void {
		this.stats.health = ev.hpLeft;
	}

	abstract onMoveStart(ev: MoveGameEvent): void;

	abstract onMoveEnd(ev: MoveGameEvent): void;

	abstract onAttack(ev: AttackEvent, targetPosition: [number, number]): void;
}
