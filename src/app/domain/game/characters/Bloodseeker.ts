import { Character } from '../Character';

export class Zombie extends Character {
	id = '2';

	name = 'Bloodseeker';
	description = 'bloodseeker character';

	health = 80;
	mana = 200;

	constructor() {
		super();
	}
}
