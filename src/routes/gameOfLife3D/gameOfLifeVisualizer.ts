import type { AComponent3D } from '../architectureTest/components3D/AComponent3D';
import * as THREE from 'three';

export interface IEngineTickContext {
	callbacks: TEngineTickCallback[];
	deltaTime: number;
	time: number;
}

export type TEngineTickCallback = (context: IEngineTickContext) => void;

export interface IEngineState {
	scene: THREE.Scene;
	camera: THREE.PerspectiveCamera | THREE.OrthographicCamera;
	renderer: THREE.WebGLRenderer;
	canvas: HTMLCanvasElement;

	callbacks: TEngineTickCallback[];

	components: AComponent3D[];

	deltaTime: number;
	time: number;
}

export let EngineState: IEngineState;

export function initThree(canvas: HTMLCanvasElement) {
	const canvasRect = canvas.getBoundingClientRect();

	const renderWidth = canvasRect.width;
	const renderHeight = canvasRect.height;

	// const renderWidth = document.body.offsetWidth;
	// const renderHeight = document.body.offsetHeight;

	// const aspectRatio = renderWidth / renderHeight;

	canvas.width = renderWidth;
	canvas.height = renderHeight;
	const renderer = new THREE.WebGLRenderer({
		alpha: true,
		canvas,
		antialias: true
	});

	renderer.setSize(renderWidth, renderHeight);

	const scene = new THREE.Scene();
	const camera = new THREE.PerspectiveCamera(20, renderWidth / renderHeight, 0.0001, 1000);
	camera.translateY(1);
	// const renderSize = 3;
	// const camera = new THREE.OrthographicCamera(
	// 	-renderSize,
	// 	renderSize,
	// 	renderSize / aspectRatio,
	// 	-renderSize / aspectRatio,
	// 	0.001,
	// 	1000
	// );

	camera.rotateX(-0.7);
	camera.translateZ(10);

	new ResizeObserver((entries) => {
		if (!entries[0]) {
			return;
		}

		const { width, height } = entries[0].contentRect;

		// canvas.setAttribute('width', `${width}`);
		// canvas.setAttribute('height', `${height}`);

		// canvas.style.width = `${width}px`;
		// canvas.style.height = `${height}px`;

		camera.aspect = width / height;
		camera.updateProjectionMatrix();

		renderer.setSize(width, height);
	}).observe(canvas.parentElement!);

	const clock = new THREE.Clock(true);

	const callbacks: TEngineTickCallback[] = [];

	const components: AComponent3D[] = [];

	// const objects: EngineObject3D[] = [];

	const engineState: IEngineState = {
		scene,
		camera,
		renderer,
		canvas,
		components,
		callbacks,
		deltaTime: 0,
		time: 0
	};

	EngineState = engineState;

	function animate() {
		requestAnimationFrame(animate);

		const deltaTime = clock.getDelta();
		const time = clock.getElapsedTime();

		engineState.time = time;

		callbacks.forEach((c) => {
			try {
				c({
					callbacks,
					deltaTime,
					time
				});
			} catch (e) {
				console.log(e);
			}
		});

		components.forEach((c) => {
			if (!c.onUpdate) {
				return;
			}

			c.onUpdate({
				callbacks,
				deltaTime,
				time
			});
		});

		renderer.render(scene, camera);
	}

	setTimeout(animate, 0);

	return engineState;
}
