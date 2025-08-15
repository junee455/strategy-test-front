import type { ActorBaseConfig } from '../../../3dRenderer/classes/actor';
import type { TickContext } from '../../../3dRenderer/types';
import type { RecieveDamagePayload } from '../../../domain/eventHandlers/onRecieveDamage';
import { lerpOverTime } from '../../../utils';
import { testSpawnCube } from '../../utils/testSpawnCube';
import { ACharacterAbstract, type ACharacterStats } from '../ACharacterAbstract';
import { throwIfEmpty } from 'rxjs';
import * as THREE from 'three';
import { lerp } from 'three/src/math/MathUtils.js';

const BODY_COLOR = '#fec07e';
const ARMOR_COLOR = '#da4037';
const ARMOR_COLOR2 = '#3b3731';

export class ATestBloodseeker extends ACharacterAbstract<{
	initialStats: ACharacterStats;
}> {
	public statsPosition3D: THREE.Vector3 = new THREE.Vector3(0, 2, 0);

	constructor(baseConfig: ActorBaseConfig, config?: void) {
		super(baseConfig, {
			initialStats: {
				name: 'bloodseeker',
				health: 100,
				mana: 100,

				maxHealth: 100,
				maxMana: 100
			}
		});

		const head = testSpawnCube(ARMOR_COLOR, [0.4, 0.5, 0.4]);
		head.translateY(1.1);

		const head2 = testSpawnCube(ARMOR_COLOR2, [0.7, 0.1, 0.5]);
		head2.translateY(-0.2);
		head2.translateZ(-0.1);

		head.add(head2);

		const body = testSpawnCube(BODY_COLOR, [0.8, 0.5, 0.5]);
		body.translateY(0.5);

		const body2 = testSpawnCube(ARMOR_COLOR2, [0.7, 0.5, 0.4]);
		// body2.translateY(-0.5);
		//
		const armor = testSpawnCube(ARMOR_COLOR, [0, 0, 0]);
		const armor2 = testSpawnCube(ARMOR_COLOR2, [0, 0, 0]);

		// hands

		// const handL = testSpawnCube()

		// armor.translateY(1);
		// armor2.translateX(1);

		this.root.add(head, body, body2, armor, armor2);
	}

	onTick(t: TickContext): void {
		this.root.rotateY(t.dt);
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

			this.root.scale.set(yScale, 1, 1);
		});
	}
}
