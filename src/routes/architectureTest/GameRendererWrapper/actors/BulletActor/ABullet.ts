import { Actor, type ActorBaseConfig } from '../../../3dRenderer/classes/actor';
import type { TickContext } from '../../../3dRenderer/types';
import * as THREE from 'three';

export class ABullet extends Actor<void> {
	projectileMesh: THREE.Mesh;

	targetActor?: Actor<void>;
	speed: number = 0;

	public follow(targetActor: Actor<void>, speed: number) {
		this.targetActor = targetActor;
		this.speed = speed;
	}

	onTick(t: TickContext): void {
		if (this.targetActor) {
			const distanceToTarget = this.targetActor.root.position.distanceTo(this.root.position);

			const dv = this.targetActor.root.position.clone().sub(this.root.position);
			dv.normalize().multiplyScalar(this.speed * t.dt);

			if (dv.length() >= distanceToTarget) {
				this.destroy();
			}

			this.root.position.copy(this.root.position.clone().add(dv));
		}
	}

	constructor(config: ActorBaseConfig) {
		super(config);

		const cubeGeometry = new THREE.BoxGeometry(0.1, 0.1, 0.1);
		const cubeMaterial = new THREE.MeshBasicMaterial({
			color: '#aaaa00'
		});

		this.projectileMesh = new THREE.Mesh(cubeGeometry, cubeMaterial);

		this.root.add(this.projectileMesh);
	}
}
