import { Actor } from '../../../3dRenderer/classes/actor';
import type { TickContext } from '../../../3dRenderer/types';
import * as THREE from 'three';

export class ATestCube extends Actor {
	private cubeMesh: THREE.Mesh;

	constructor(color: string) {
		super();

		const testCube = new THREE.Mesh(
			new THREE.BoxGeometry(1, 1, 1),
			new THREE.MeshBasicMaterial({
				color
			})
		);

		this.root.add(testCube);

		this.cubeMesh = testCube;
	}

	onTick(t: TickContext): void {
		this.cubeMesh.rotateY(t.dt);
	}
}
