import { Actor, type ActorBaseConfig } from '../../3dRenderer/classes/actor';
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
}
