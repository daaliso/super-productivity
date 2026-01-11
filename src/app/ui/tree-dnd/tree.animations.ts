import { animate, style, transition, trigger } from '@angular/animations';
import { TREE_CONSTANTS } from './tree-constants';

export const expandCollapseAni = trigger('expandCollapse', [
  transition(':enter', [
    style({ height: '0px' }),
    animate(`${TREE_CONSTANTS.ANIMATION_DURATION}ms ease-in-out`, style({ height: '*' })),
  ]),
  transition(':leave', [
    style({ height: '*' }),
    animate(
      `${TREE_CONSTANTS.ANIMATION_DURATION}ms ease-in-out`,
      style({ height: '0px' }),
    ),
  ]),
]);
