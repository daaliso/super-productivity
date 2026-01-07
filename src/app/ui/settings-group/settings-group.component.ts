import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { CommonModule } from '@angular/common';

/**
 * Container for grouping settings list items with Pixel-style bordered sections.
 */
@Component({
  selector: 'settings-group',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './settings-group.component.html',
  styleUrl: './settings-group.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SettingsGroupComponent {
  /** Optional section header */
  header = input<string>();
}
