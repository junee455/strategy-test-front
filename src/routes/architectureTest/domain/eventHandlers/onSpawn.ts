// import type { Character } from '../interfaces/Character';
import type { GameEvent } from '../interfaces/GameState';
import { type KnownCharacterIds } from './characters';

export type SpawnCharacterDescriptor = {
	ownerId: string;
	characterId: KnownCharacterIds;
	id: string;
};

export type SpawnGameEvent = GameEvent<'spawn', SpawnCharacterDescriptor>;
