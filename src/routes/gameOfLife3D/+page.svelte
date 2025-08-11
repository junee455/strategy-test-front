<script lang="ts">
	import { GameOfLife3D } from './GameOfLife3D';
	import { EngineState, initThree, type IEngineState } from './gameOfLifeVisualizer';
	import { onMount } from 'svelte';
	import * as THREE from 'three';

	let canvasElRef: HTMLCanvasElement;

	let canvasContainerElRef: HTMLDivElement;

	let engineState: IEngineState;

	onMount(() => {
		engineState = initThree(canvasElRef);

		const x = 30,
			y = 30,
			z = 30;

		const gameState = new GameOfLife3D(x, y, z);
		gameState.fillRandom();

		const voxelSize = 0.05;

		const cubesScene = new THREE.Scene();

		const generateCube = (x: number, y: number, z: number) => {
			const boxGeometry = new THREE.BoxGeometry(voxelSize, voxelSize, voxelSize);

			const boxMaterial = new THREE.MeshBasicMaterial({ color: new THREE.Color(x, y, z) });

			const boxMesh = new THREE.Mesh(boxGeometry, boxMaterial);

			return {
				boxMesh,
				boxMaterial
			};
		};

		const voxelGap = 0;

		const cubes = new Array(x).fill(0).map((_, ix) =>
			new Array(y).fill(0).map((_, iy) =>
				new Array(x).fill(0).map((_, iz) => {
					const cube = generateCube(ix / x, iy / y, iz / z);

					cube.boxMesh.position.set(
						ix * voxelSize * (1 + voxelGap) - (x * voxelSize) / 2,
						iy * voxelSize * (1 + voxelGap),
						iz * voxelSize * (1 + voxelGap) - (z * voxelSize) / 2
					);

					cubesScene.add(cube.boxMesh);

					return cube;
				})
			)
		);

		// cubesScene.translateY(1);

		engineState.scene.add(cubesScene);

		setInterval(() => {
			gameState.nextStep();

			gameState.getCurrentArr().forEach((slice, ix) =>
				slice.forEach((row, iy) =>
					row.forEach((cell, iz) => {
						cubes[ix][iy][iz].boxMesh.visible = cell;
					})
				)
			);
		}, 200);

		engineState.callbacks.push((c) => {
			cubesScene.rotateY(1 * c.deltaTime);

			// boxMaterial.color.set(Math.abs(Math.sin(EngineState.time)), 0, 0);
			// boxMaterial.color = new THREE `#${Math.sin(engineState.time)}0000`;
		});
	});
</script>

<div class="GameOfLife3D">
	<h1>Game of life</h1>
	<div class="canvasContainer" bind:this={canvasContainerElRef}>
		<canvas bind:this={canvasElRef}></canvas>
	</div>
</div>

<style lang="scss">
	:global(html, body) {
		width: 100%;
		height: 100%;
		margin: 0;
		padding: 0;

		position: relative;
		box-sizing: border-box;
	}

	.GameOfLife3D {
		height: 100%;

		display: flex;
		flex-direction: column;

		canvas {
			position: absolute;
			top: 0;
			left: 0;
			width: 100%;
			height: 100%;
		}

		.canvasContainer {
			width: 100%;
			flex-grow: 1;

			overflow: hidden;
			position: relative;
		}
	}
</style>
