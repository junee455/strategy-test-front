import type { PageLoad } from './$types';
import { RAPIER } from './RapierExport';

export const load: PageLoad = async () => {
	return { RAPIER: RAPIER };
};
