import type { TickContext } from '../types';
import type { Component } from './component';
import * as THREE from 'three';

export abstract class Actor {
	position: THREE.Vector3 = new THREE.Vector3(0, 0, 0);

	components?: Component[] = [];

	constructor() {}

	abstract onTick?(t: TickContext): void;
}
