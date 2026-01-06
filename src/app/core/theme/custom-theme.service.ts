import { inject, Injectable } from '@angular/core';
import { DOCUMENT } from '@angular/common';

export interface CustomTheme {
  id: string;
  name: string;
  // We no longer need 'url' as themes are class-based
  requiredMode?: 'dark' | 'light' | 'system';
}

export const AVAILABLE_CUSTOM_THEMES: CustomTheme[] = [
  {
    id: 'default',
    name: 'Default (Indigo)',
    requiredMode: 'system',
  },
  {
    id: 'blue',
    name: 'Blue',
    requiredMode: 'system',
  },
  {
    id: 'green',
    name: 'Green',
    requiredMode: 'system',
  },
  {
    id: 'yellow',
    name: 'Yellow',
    requiredMode: 'system',
  },
  {
    id: 'brown',
    name: 'Brown',
    requiredMode: 'system',
  },
  // Legacy themes - kept for now, but will likely need migration or removal
  {
    id: 'dracula',
    name: 'Dracula',
    requiredMode: 'dark',
  },
];

@Injectable({ providedIn: 'root' })
export class CustomThemeService {
  private document = inject<Document>(DOCUMENT);

  loadTheme(themeId: string): void {
    const theme = AVAILABLE_CUSTOM_THEMES.find((t) => t.id === themeId);

    if (!theme) {
      console.error(`Theme with id ${themeId} not found`);
      return;
    }

    // Remove all existing theme classes
    AVAILABLE_CUSTOM_THEMES.forEach((t) => {
      this.document.body.classList.remove(`theme-${t.id}`);
    });

    // Add new theme class
    if (theme.id !== 'default') {
      this.document.body.classList.add(`theme-${themeId}`);
    }
  }

  getAvailableThemes(): CustomTheme[] {
    return AVAILABLE_CUSTOM_THEMES;
  }
}
