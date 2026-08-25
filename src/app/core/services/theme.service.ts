import { Injectable, signal, effect } from '@angular/core';

export type ThemeMode = 'light' | 'dark';
export type SidebarMode = 'expanded' | 'compact';
export type FontFamily = 'Inter' | 'Roboto' | 'Poppins' | 'Open Sans' | 'Arial';
export type FontSize = 'small' | 'medium' | 'large';

export interface ThemeState {
  mode: ThemeMode;
  primaryColor: string;
  font: FontFamily;
  fontSize: FontSize;
  sidebarMode: SidebarMode;
}

const THEME_KEY = 'es_theme';

const DEFAULT_THEME: ThemeState = {
  mode: 'light',
  primaryColor: '#3457d5',
  font: 'Inter',
  fontSize: 'medium',
  sidebarMode: 'expanded'
};

@Injectable({ providedIn: 'root' })
export class ThemeService {

  theme = signal<ThemeState>(this.loadFromStorage());

  constructor() {
    effect(() => {
      const t = this.theme();
      document.body.setAttribute('data-theme', t.mode);
      document.body.setAttribute('data-font', t.font);
      document.body.setAttribute('data-font-size', t.fontSize);
      document.body.style.setProperty('--primary', t.primaryColor);
      localStorage.setItem(THEME_KEY, JSON.stringify(t));
    });
  }

  private loadFromStorage(): ThemeState {
    try {
      const saved = JSON.parse(localStorage.getItem(THEME_KEY) || 'null');
      return saved ? { ...DEFAULT_THEME, ...saved } : DEFAULT_THEME;
    } catch { return DEFAULT_THEME; }
  }

  update(partial: Partial<ThemeState>) {
    this.theme.update(t => ({ ...t, ...partial }));
  }

  resetToDefault() {
    this.theme.set(DEFAULT_THEME);
  }
}
