import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  HostListener,
  inject,
  input,
  output,
  signal,
} from '@angular/core';
import { MatMiniFabButton } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { MatTooltip } from '@angular/material/tooltip';
import { TranslatePipe } from '@ngx-translate/core';
import {
  animate,
  query,
  stagger,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';
import { LongPressDirective } from '../../ui/longpress/longpress.directive';

export interface FabMenuItem {
  id: string;
  icon: string;
  label?: string; // Used for tooltip
  color?: 'primary' | 'accent' | 'warn'; // Optional color override
  action?: () => void;
}

@Component({
  selector: 'fab-menu',
  standalone: true,
  imports: [MatMiniFabButton, MatIcon, MatTooltip, TranslatePipe, LongPressDirective],
  templateUrl: './fab-menu.component.html',
  styleUrls: ['./fab-menu.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [
    // M3 Expressive: Individual menu item entry/exit
    trigger('menuState', [
      transition(':enter', [
        style({ opacity: 0, transform: 'scale(0.8)' }),
        animate(
          '250ms var(--motion-easing-expressive)',
          style({ opacity: 1, transform: 'scale(1)' }),
        ),
      ]),
      transition(':leave', [
        animate(
          '150ms var(--motion-easing-standard)',
          style({ opacity: 0, transform: 'scale(0.9)' }),
        ),
      ]),
    ]),
    // M3 Expressive: Main FAB icon rotation with dramatic 135deg
    trigger('fabRotation', [
      state('open', style({ transform: 'rotate(135deg)' })),
      state('closed', style({ transform: 'rotate(0)' })),
      transition('open <=> closed', [animate('300ms var(--motion-easing-expressive)')]),
    ]),
    // M3 Expressive: Staggered list animation with increased rhythm
    trigger('listAnimation', [
      transition('* => *', [
        query(
          ':enter',
          [
            style({ opacity: 0, transform: 'translateY(20px) scale(0.85)' }),
            stagger(60, [
              animate(
                '300ms var(--motion-easing-expressive)',
                style({ opacity: 1, transform: 'translateY(0) scale(1)' }),
              ),
            ]),
          ],
          { optional: true },
        ),
        query(
          ':leave',
          [
            stagger(30, [
              animate(
                '200ms var(--motion-easing-standard)',
                style({ opacity: 0, transform: 'translateY(-10px) scale(0.9)' }),
              ),
            ]),
          ],
          { optional: true },
        ),
      ]),
    ]),
  ],
})
export class FabMenuComponent {
  items = input.required<FabMenuItem[]>();
  mainIcon = input<string>('add');
  mainTooltip = input<string>('');
  expandDirection = input<'up' | 'down'>('up');
  /**
   * When provided, clicking the main FAB executes this action directly.
   * The menu only shows on long-press. This is the recommended UX pattern
   * when there's a clear primary action (like "Add Task").
   */
  mainAction = input<(() => void) | undefined>(undefined);

  /** Emitted when the main FAB is clicked (only when mainAction is not set) */
  mainFabClick = output<void>();

  isOpen = signal(false);
  private _elementRef = inject(ElementRef);

  onMainFabClick(event?: MouseEvent): void {
    if (event) {
      event.stopPropagation();
    }

    const action = this.mainAction();
    if (action) {
      // If mainAction is provided, execute it directly on click
      action();
    } else {
      // Otherwise, toggle the menu (original behavior)
      this.isOpen.update((v) => !v);
      this.mainFabClick.emit();
    }
  }

  onMainFabLongPress(): void {
    // Long press always opens the menu (for accessing secondary actions)
    this.isOpen.set(true);
  }

  toggleMenu(event?: MouseEvent): void {
    if (event) {
      event.stopPropagation();
    }
    this.isOpen.update((v) => !v);
  }

  closeMenu(): void {
    this.isOpen.set(false);
  }

  onItemClick(item: FabMenuItem, event: MouseEvent): void {
    event.stopPropagation();
    if (item.action) {
      item.action();
    }
    this.closeMenu();
  }

  @HostListener('document:click', ['$event'])
  onClickOutside(event: MouseEvent): void {
    if (!this._elementRef.nativeElement.contains(event.target)) {
      this.closeMenu();
    }
  }
}
