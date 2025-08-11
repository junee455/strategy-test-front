export abstract class Character {
	id = '';

	name = '';
	description = '';

	health = 0;
	mana = 0;

	position: [number, number] = [0, 0];

	constructor() {}
}
