import type { KnownCharacterIds } from '../../domain/eventHandlers/characters';
import type { ACharacterAbstract } from '../actors/ACharacterAbstract';
import { ATestBloodseeker } from '../actors/ATestBloodseeker/ATestBloodseeker';
import { ATestSniper } from '../actors/ATestSniper/ATestSniper';

export type KnownCharacterTypes = ATestBloodseeker | ATestSniper;

export type TKnownCharacterTypes = typeof ATestBloodseeker | typeof ATestSniper;

export function getCharacterActorClass(id: KnownCharacterIds): TKnownCharacterTypes | undefined {
	const mapping: {
		[key in KnownCharacterIds]?: TKnownCharacterTypes;
	} = {
		bloodseeker: ATestBloodseeker,
		sniper: ATestSniper
	};

	return mapping[id];
}
