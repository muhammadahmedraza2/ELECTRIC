import { Injectable, signal, effect } from '@angular/core';

export type ThemeName = 'light' | 'dark' | 'blue';
export type FontName = 'poppins' | 'roboto' | 'inter';

export interface PrivacySettings {
  shareUsageData: boolean;
  emailNotifications: boolean;
  twoFactorAuth: boolean;
  publicProfile: boolean;
}

const THEME_KEY = 'ed_theme';
const FONT_KEY = 'ed_font';
const PRIVACY_KEY = 'ed_privacy';

@Injectable({ providedIn: 'root' })
export class ThemeService {

  theme = signal<ThemeName>((localStorage.getItem(THEME_KEY) as ThemeName) || 'light');
  font = signal<FontName>((localStorage.getItem(FONT_KEY) as FontName) || 'poppins');

  privacy = signal<PrivacySettings>(
    JSON.parse(localStorage.getItem(PRIVACY_KEY) || 'null') || {
      shareUsageData: true,
      emailNotifications: true,
      twoFactorAuth: false,
      publicProfile: false
    }
  );

  constructor() {
    // Applies globally to <body> the moment theme/font changes — no per-component CSS needed
    effect(() => {
      document.body.setAttribute('data-theme', this.theme());
      localStorage.setItem(THEME_KEY, this.theme());
    });
    effect(() => {
      document.body.setAttribute('data-font', this.font());
      localStorage.setItem(FONT_KEY, this.font());
    });
    effect(() => {
      localStorage.setItem(PRIVACY_KEY, JSON.stringify(this.privacy()));
    });
  }

  setTheme(t: ThemeName) { this.theme.set(t); }
  setFont(f: FontName) { this.font.set(f); }
  updatePrivacy(key: keyof PrivacySettings, value: boolean) {
    this.privacy.update(p => ({ ...p, [key]: value }));
  }
}
