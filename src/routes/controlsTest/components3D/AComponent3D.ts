import type { IEngineTickContext } from '../../gameOfLife3D/gameOfLifeVisualizer';
import * as THREE from 'three';

export abstract class AComponent3D {
	root: THREE.Object3D = new THREE.Object3D();

	onUpdate?(context: IEngineTickContext): void;
}
