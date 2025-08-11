import { Character } from '../Character';

export class Zombie extends Character {
	id = '1';

	name = 'Zombie';
	description = 'zombie character';

	health = 100;
	mana = 100;

	constructor() {
		super();
	}
}
