import type { ATestBloodseeker } from '../../GameRendererWrapper/actors/ATestBloodseeker/ATestBloodseeker';
import type { ATestSniper } from '../../GameRendererWrapper/actors/ATestSniper/ATestSniper';
import type { ABullet } from '../../GameRendererWrapper/actors/BulletActor/ABullet';

export type RegisteredActors = typeof ATestBloodseeker | typeof ATestSniper | typeof ABullet;
