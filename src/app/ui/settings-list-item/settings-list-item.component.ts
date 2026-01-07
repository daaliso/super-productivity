import { ChangeDetectionStrategy, Component, input, output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatRippleModule } from '@angular/material/core';
import { RouterModule } from '@angular/router';

/**
 * M3-styled settings list item component with Pixel-inspired design.
 * Features: Leading icon in tinted circle, two-line content, trailing chevron/action.
 */
@Component({
  selector: 'settings-list-item',
  standalone: true,
  imports: [CommonModule, MatIconModule, MatRippleModule, RouterModule],
  templateUrl: './settings-list-item.component.html',
  styleUrl: './settings-list-item.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SettingsListItemComponent {
  /** Material Symbol icon name */
  icon = input.required<string>();

  /** Primary text (headline) */
  title = input.required<string>();

  /** Secondary text (supporting text) */
  subtitle = input<string>();

  /** Icon background color class (e.g., 'primary', 'secondary', 'tertiary') */
  iconColor = input<'primary' | 'secondary' | 'tertiary' | 'error'>('primary');

  /** Whether to show the trailing chevron */
  showChevron = input<boolean>(true);

  /** Click event emitter */
  itemClick = output<void>();

  onClick(): void {
    this.itemClick.emit();
  }
}
