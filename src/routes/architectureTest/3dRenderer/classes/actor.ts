import type { Renderer3D } from '..';
import type { TickContext } from '../types';
import type { Component } from './component';
import * as THREE from 'three';

export type ActorBaseConfig = {
	renderer3d: Renderer3D;
};

export abstract class Actor<Config> {
	id: string = '';

	root: THREE.Group = new THREE.Group();

	components?: Component[] = [];

	constructor(
		protected baseConfig: ActorBaseConfig,
		protected config?: Config
	) {}

	// public abstract init(): void;

	onTick?(t: TickContext): void;

	destroy() {
		this.baseConfig.renderer3d.destroyActor(this);
	}
}
