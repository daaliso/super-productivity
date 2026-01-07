import { animate, style, transition, trigger } from '@angular/animations';

// M3 Expressive motion - spring-based animations
// Reference: https://m3.material.io/styles/motion/overview
const M3_SPRING_ENTER = '350ms cubic-bezier(0.2, 0, 0, 1)';
const M3_SPRING_LEAVE = '250ms cubic-bezier(0.4, 0, 1, 1)';

export const magicSideNavAnimations = [
  trigger('mobileNav', [
    transition(':enter', [
      style({ transform: 'translateX(-100%)', opacity: 0.5 }),
      animate(M3_SPRING_ENTER, style({ transform: 'translateX(0)', opacity: 1 })),
    ]),
    transition(':leave', [
      animate(M3_SPRING_LEAVE, style({ transform: 'translateX(-100%)', opacity: 0.5 })),
    ]),
  ]),
  trigger('mobileBackdrop', [
    transition(':enter', [
      style({ opacity: 0 }),
      animate('200ms cubic-bezier(0.2, 0, 0, 1)', style({ opacity: 1 })),
    ]),
    transition(':leave', [
      animate('150ms cubic-bezier(0.4, 0, 1, 1)', style({ opacity: 0 })),
    ]),
  ]),
];
