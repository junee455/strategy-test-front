import type { Actor } from './classes/actor';
import { initThree, type IRendererState, type IRendererTickCallback } from './initThree';
import type { RegisteredActors, TickContext } from './types';
import * as THREE from 'three';

export interface Renderer3DConfig {
	canvasEl: HTMLCanvasElement;
	targetFps: number;
}

export class Renderer3D {
	private lastId = 0;

	private startTime: number = -1;

	private rendererState: IRendererState;

	camera: THREE.Camera;

	canvasEl: HTMLCanvasElement;

	registeredIds: string[] = [];

	actors: Actor<any>[] = [];

	uiRegistry: {
		id: string;
		payload: any;
	}[] = [];

	constructor(config: Renderer3DConfig) {
		this.canvasEl = config.canvasEl;

		this.rendererState = initThree(config.canvasEl);

		this.rendererState.callbacks.push((context) => {
			this.updateChildren({
				dt: context.deltaTime
			});
		});

		this.camera = this.rendererState.camera;
	}

	public spawnFromClass(c: RegisteredActors, id?: string, config?: unknown): Actor<unknown> {
		if (this.registeredIds.includes(id as string)) {
			throw new Error(`an actor with id '${id}' already exists`);
		}

		const obj = new c(
			{
				renderer3d: this
			},
			config
		);

		obj.id = id === undefined ? this.registerNextId() : this.updateId(id);

		this.addActor(obj);

		return obj;
	}

	private updateId(id: string) {
		const tryNum = Number(id);

		if (isNaN(tryNum)) {
			return id;
		}

		this.lastId = tryNum;

		return id;
	}

	private registerNextId() {
		this.lastId++;

		return `${this.lastId}`;
	}

	public addActor(actor: Actor<any>) {
		this.actors.push(actor);
		this.rendererState.scene.add(actor.root);
	}

	public destroyActorById(id: string) {
		const actorIndex = this.actors.findIndex((a) => a.id === id);

		this.rendererState.scene.remove(this.actors[actorIndex].root);
		this.actors.splice(actorIndex, 1);
	}

	public destroyActor(actor: Actor<any>) {
		const actorIndex = this.actors.indexOf(actor);
		this.actors.splice(actorIndex, 1);
		this.rendererState.scene.remove(actor.root);
	}

	private updateChildren(t: TickContext) {
		this.actors.forEach((a) => {
			a.onTick?.(t);

			a.components?.forEach((c) => {
				c.onTick?.(t);
			});
		});
	}

	public getUiById(id: string) {
		return this.uiRegistry.find((c) => c.id === id);
	}

	public setUiById(id: string, payload: any) {
		const uiComponent = this.uiRegistry.find((c) => c.id === id);

		if (!uiComponent) {
			this.uiRegistry.push({
				id,
				payload
			});
		} else {
			uiComponent.payload = payload;
		}
	}

	addCallback(c: IRendererTickCallback) {
		this.rendererState.callbacks.push(c);
	}
}
