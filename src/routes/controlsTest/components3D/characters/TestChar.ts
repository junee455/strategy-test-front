// import type { IEngineTickContext } from '../../../gameOfLife3D/gameOfLifeVisualizer';
import { ACharacter } from './ACharacter';
import * as THREE from 'three';

export class TestChar extends ACharacter {
	constructor() {
		super();

		const material = new THREE.MeshBasicMaterial({
			color: '#ff00ff'
		});

		const boxGeometry = new THREE.BoxGeometry(0.5, 1, 0.5);

		this.root.add(new THREE.Mesh(boxGeometry, material));
	}

	// onUpdate(context: IEngineTickContext): void {
	// 	this.root.rotateY(context.deltaTime);
	// }
}
