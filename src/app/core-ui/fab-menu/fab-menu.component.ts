import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  HostListener,
  inject,
  input,
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
  imports: [MatMiniFabButton, MatIcon, MatTooltip, TranslatePipe],
  templateUrl: './fab-menu.component.html',
  styleUrls: ['./fab-menu.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [
    trigger('menuState', [
      transition(':enter', [
        style({ opacity: 0, transform: 'scale(0.8)' }),
        animate(
          '200ms cubic-bezier(0.4, 0.0, 0.2, 1)',
          style({ opacity: 1, transform: 'scale(1)' }),
        ),
      ]),
      transition(':leave', [
        animate(
          '150ms cubic-bezier(0.4, 0.0, 0.2, 1)',
          style({ opacity: 0, transform: 'scale(0.8)' }),
        ),
      ]),
    ]),
    trigger('fabRotation', [
      state('open', style({ transform: 'rotate(45deg)' })),
      state('closed', style({ transform: 'rotate(0)' })),
      transition('open <=> closed', [animate('200ms cubic-bezier(0.4, 0.0, 0.2, 1)')]),
    ]),
    trigger('listAnimation', [
      transition('* => *', [
        query(
          ':enter',
          [
            style({ opacity: 0, transform: 'translateY(10px) scale(0.8)' }),
            stagger(50, [
              animate(
                '200ms cubic-bezier(0.4, 0.0, 0.2, 1)',
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
                '150ms cubic-bezier(0.4, 0.0, 0.2, 1)',
                style({ opacity: 0, transform: 'translateY(10px) scale(0.8)' }),
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

  isOpen = signal(false);
  private _elementRef = inject(ElementRef);

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
