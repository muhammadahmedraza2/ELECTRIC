import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { BehaviorSubject } from 'rxjs';

export type AppTheme = 'light' | 'dark';

export interface FontOption {
  label: string;
  value: string;
}

export const FONT_OPTIONS: FontOption[] = [
  { label: 'Segoe UI (Default)', value: "'Segoe UI', system-ui, sans-serif" },
  { label: 'Roboto', value: "'Roboto', sans-serif" },
  { label: 'Poppins', value: "'Poppins', sans-serif" },
  { label: 'Open Sans', value: "'Open Sans', sans-serif" },
  { label: 'Georgia (Serif)', value: "Georgia, serif" },
  { label: 'Courier New (Mono)', value: "'Courier New', monospace" }
];

interface ThemeSettings {
  theme: AppTheme;
  fontFamily: string;
}

const STORAGE_KEY = 'app_theme_settings';

const DEFAULT_SETTINGS: ThemeSettings = {
  theme: 'light',
  fontFamily: FONT_OPTIONS[0].value
};

@Injectable({ providedIn: 'root' })
export class ThemeService {

  private isBrowser: boolean;

  private settingsSubject = new BehaviorSubject<ThemeSettings>(DEFAULT_SETTINGS);
  settings$ = this.settingsSubject.asObservable();

  fontOptions = FONT_OPTIONS;

  constructor(@Inject(PLATFORM_ID) platformId: object) {
    this.isBrowser = isPlatformBrowser(platformId);

    if (this.isBrowser) {
      const settings = this.loadSettings();
      this.settingsSubject.next(settings);
      this.applySettings(settings);
    }
  }

  get current(): ThemeSettings {
    return this.settingsSubject.value;
  }

  setTheme(theme: AppTheme): void {
    const updated = { ...this.current, theme };
    this.settingsSubject.next(updated);
    this.applySettings(updated);
    this.persist(updated);
  }

  setFontFamily(fontFamily: string): void {
    const updated = { ...this.current, fontFamily };
    this.settingsSubject.next(updated);
    this.applySettings(updated);
    this.persist(updated);
  }

  private applySettings(settings: ThemeSettings): void {
    if (!this.isBrowser) return;

    document.documentElement.setAttribute('data-theme', settings.theme);
    document.documentElement.style.setProperty(
      '--app-font-family',
      settings.fontFamily
    );
  }

  private persist(settings: ThemeSettings): void {
    if (!this.isBrowser) return;

    localStorage.setItem(STORAGE_KEY, JSON.stringify(settings));
  }

  private loadSettings(): ThemeSettings {
    if (!this.isBrowser) return DEFAULT_SETTINGS;

    const raw = localStorage.getItem(STORAGE_KEY);

    try {
      return raw
        ? { ...DEFAULT_SETTINGS, ...JSON.parse(raw) }
        : DEFAULT_SETTINGS;
    } catch {
      return DEFAULT_SETTINGS;
    }
  }
}