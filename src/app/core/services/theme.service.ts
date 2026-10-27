import { DOCUMENT, isPlatformBrowser } from '@angular/common';
import { Injectable, PLATFORM_ID, effect, inject, signal } from '@angular/core';

export type ThemeMode = 'light' | 'dark';
export type SidebarMode = 'expanded' | 'compact';
export type FontFamily = 'Inter' | 'Roboto' | 'Poppins' | 'Open Sans' | 'Arial';
export type FontSize = 'small' | 'medium' | 'large';

export interface ThemeState {
  mode: ThemeMode;
  primaryColor: string;
  surfaceTone: string;
  font: FontFamily;
  fontSize: FontSize;
  sidebarMode: SidebarMode;
}

const THEME_KEY = 'es_theme';

export const THEME_PRESETS = [
  { name: 'Cobalt', color: '#3457d5' },
  { name: 'Emerald', color: '#16845b' },
  { name: 'Terracotta', color: '#c45435' },
  { name: 'Teal', color: '#087e8b' },
  { name: 'Berry', color: '#b23a68' },
  { name: 'Amber', color: '#a66b00' },
  { name: 'Graphite', color: '#53616c' },
  { name: 'Ocean', color: '#1769aa' }
] as const;

const DEFAULT_THEME: ThemeState = {
  mode: 'light',
  primaryColor: '#3457d5',
  surfaceTone: '#f4f5fb',
  font: 'Inter',
  fontSize: 'medium',
  sidebarMode: 'expanded'
};

@Injectable({ providedIn: 'root' })
export class ThemeService {
  private readonly platformId = inject(PLATFORM_ID);
  private readonly document = inject(DOCUMENT);
  private tenantId = 'default';

  theme = signal<ThemeState>(this.loadFromStorage(this.storageKey()));

  constructor() {
    effect(() => {
      const t = this.theme();
      const body = this.document.body;
      body?.setAttribute('data-theme', t.mode);
      body?.setAttribute('data-font', t.font);
      body?.setAttribute('data-font-size', t.fontSize);
      body?.style.setProperty('--primary', t.primaryColor);
      body?.style.setProperty('--primary-dark', this.darken(t.primaryColor));
      body?.style.setProperty('--primary-soft', `${t.primaryColor}1a`);
      if (t.mode === 'light') body?.style.setProperty('--bg-body', t.surfaceTone);
      else body?.style.removeProperty('--bg-body');
      if (isPlatformBrowser(this.platformId)) {
        localStorage.setItem(this.storageKey(), JSON.stringify(t));
      }
    });
  }

  setTenantScope(tenantId: string | null) {
    this.tenantId = tenantId?.trim() || 'default';
    this.theme.set(this.loadFromStorage(this.storageKey()));
  }

  private storageKey(): string {
    return `${THEME_KEY}:${this.tenantId}`;
  }

  private loadFromStorage(key: string): ThemeState {
    if (!isPlatformBrowser(this.platformId)) return DEFAULT_THEME;
    try {
      const saved = JSON.parse(localStorage.getItem(key) || 'null');
      return saved ? { ...DEFAULT_THEME, ...saved } : DEFAULT_THEME;
    } catch { return DEFAULT_THEME; }
  }

  private darken(hex: string): string {
    const value = Number.parseInt(hex.slice(1), 16);
    const channel = (shift: number) => Math.max(0, ((value >> shift) & 0xff) - 28);
    return `#${[16, 8, 0].map(shift => channel(shift).toString(16).padStart(2, '0')).join('')}`;
  }

  update(partial: Partial<ThemeState>) {
    this.theme.update(t => ({ ...t, ...partial }));
  }

  resetToDefault() {
    this.theme.set(DEFAULT_THEME);
  }
}
