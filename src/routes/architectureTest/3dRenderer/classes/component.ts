import type { TickContext } from '../types';

export abstract class Component {
	abstract onTick?(t: TickContext): void;
}
