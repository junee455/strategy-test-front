export interface CharacterStats {
	health: number;
	mana: number;
}

export interface CharacterEffect {
	name: string;
}

export interface Character extends CharacterStats {
	id: string;

	characterId: string;
	name: string;
	description: string;

	effects: CharacterEffect[];

	position: [number, number];
}
