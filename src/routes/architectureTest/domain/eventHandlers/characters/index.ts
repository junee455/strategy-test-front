import type { Character } from '../../interfaces/Character';

export type CharacterDescription = Omit<Character, 'id' | 'position' | 'effects'>;

export type KnownCharacterIds = 'bloodseeker' | 'sniper';

const knownCharactersDescriptions: {
	[key in KnownCharacterIds]?: CharacterDescription;
} = {
	bloodseeker: {
		characterId: 'bloodseeker',

		health: 100,
		mana: 80,

		name: 'Bloodseeker',
		description: 'test bloodseeker'
	},
	sniper: {
		characterId: 'sniper',

		health: 100,
		mana: 80,

		name: 'Sniper',
		description: 'test sniper'
	}
};

export function getCharacterDescription(characterId: keyof typeof knownCharactersDescriptions) {
	return knownCharactersDescriptions[characterId];
}
