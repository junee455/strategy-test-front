import type { Actor } from './classes/actor';
import { initThree, type IRendererState } from './initThree';
import * as THREE from 'three';

export interface Renderer3DConfig {
	canvasEl: HTMLCanvasElement;
	targetFps: number;
}

export class Renderer3D {
	private startTime: number = -1;

	private rendererState: IRendererState;

	canvasEl: HTMLCanvasElement;

	actors: Actor[] = [];

	constructor(config: Renderer3DConfig) {
		this.canvasEl = config.canvasEl;

		this.rendererState = initThree(config.canvasEl);

		this.addTestCube();
		// this.rendererState.scene.add()
	}

	private addTestCube() {
		const { scene } = this.rendererState;

		const testBox = new THREE.Mesh(
			new THREE.BoxGeometry(1, 1, 1),
			new THREE.MeshBasicMaterial({
				color: '#ff0088'
			})
		);

		scene.add(testBox);
	}
}
