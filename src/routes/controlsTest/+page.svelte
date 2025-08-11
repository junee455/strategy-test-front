<script lang="ts">
	import { EngineState, initThree } from '../gameOfLife3D/gameOfLifeVisualizer';
	import { buildComponent2D, type GameComponent2D } from './api/GameContext.svelte';
	import * as InputController from './api/InputController.svelte';
	import { initTest, type CallbackFunction } from './api/tsTest';
	import { TestChar } from './components3D/characters/TestChar';
	import { initTestFloor } from './components3D/testFloor';
	import ClickDrop, { type ClickDropProps } from './testComponents/ClickDrop.svelte';
	import TestA from './testComponents/TestA.svelte';
	import { onMount, type ComponentProps } from 'svelte';

	const {
		onMouseButtonDown,
		onMouseButtonUp,
		onMouseLeave,
		onMouseMove,
		onKeyUp,
		onKeyDown,
		getMousePosition,
		getKeysPressed,
		getMouseButtonPressed
	} = InputController;

	const mousePosition = $derived(getMousePosition());
	const keysPressed = $derived(getKeysPressed());
	const mouseButtonPressed = $derived(getMouseButtonPressed());

	let rotation = $state(0);

	console.log('ON MOUNT');

	$effect(() => {
		if (mouseButtonPressed.includes('middle')) {
			// check mouse drag
		}

		// $inspect(mouseButtonPressed);
	});

	onMount(() => {
		const engineState = initTest();
	});

	const displayMouseButtons = () => {
		if (!mouseButtonPressed.length) {
			return 'none';
		}
		return mouseButtonPressed.join(', ');
	};

	const displayKeyboardButtons = () => {
		const arr = Array.from(keysPressed);

		if (!arr.length) {
			return 'none';
		}

		return arr.join(', ');
	};

	let canvasElRef: HTMLCanvasElement;

	onMount(() => {
		const engineState = initThree(canvasElRef);

		const testFloorActor = initTestFloor();

		const testChar = new TestChar();

		engineState.callbacks.push(testFloorActor.onTick);
		engineState.scene.add(testFloorActor.mesh);

		engineState.components.push(testChar);

		// testChar.root.translateY(1);

		testChar.root.rotateY(1);

		engineState.scene.add(testChar.root);

		const interval = setInterval(() => {
			rotation += 0.2;
		}, 100);

		return () => {
			clearInterval(interval);
		};

		// engineState.callbacks.pu
	});

	const onFieldClick = (ev: MouseEvent) => {};
</script>

<div class="AchitectureTest-page">
	<div class="ui-container">
		<h1>Architecture test</h1>
		<div class="ui-row">
			<div class="ui-column">
				<h2>svelte buttons</h2>

				<a href="../sidePage">go test state</a>
			</div>
			<div class="ui-column">
				<h2>stats</h2>
				{#if mousePosition}
					<div>
						mouse pos: {mousePosition[0]}
						{mousePosition[1]}
					</div>
				{:else}
					<div>mouse pos: undefined</div>
				{/if}

				<div>mouse buttons: {displayMouseButtons()}</div>
				<div>keyboard buttons: {displayKeyboardButtons()}</div>
			</div>
		</div>
	</div>
	<div class="gameViewWrapper">
		<canvas bind:this={canvasElRef}></canvas>
		<div
			tabindex="0"
			class="testField2D"
			onmousemove={onMouseMove}
			onmouseleave={onMouseLeave}
			onmouseout={onMouseLeave}
			onmousedown={onMouseButtonDown}
			onmouseup={onMouseButtonUp}
			onkeydown={onKeyDown}
			onkeyup={onKeyUp}
			oncontextmenu={(ev) => {
				ev.preventDefault();
				onFieldClick(ev);
			}}
		></div>
	</div>
</div>

<style lang="scss">
	@use './ArchitectureTest.scss';
</style>
