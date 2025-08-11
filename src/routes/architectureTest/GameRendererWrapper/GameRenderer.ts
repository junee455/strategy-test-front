import { Renderer3D } from '../3dRenderer';
import type { IGameEventsSource } from '../domain/interfaces/IGameEventsEmitter';

export class GameRenderer {
	private renderer3d: Renderer3D;

	constructor(
		canvasEl: HTMLCanvasElement,
		public mainEventsSource: IGameEventsSource
	) {
		this.renderer3d = new Renderer3D({
			canvasEl,
			targetFps: 60
		});
	}
}
