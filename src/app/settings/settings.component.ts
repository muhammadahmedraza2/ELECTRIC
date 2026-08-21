import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ThemeService, ThemeName, FontName } from '../services/theme.service';

@Component({
  selector: 'app-settings',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './settings.component.html',
  styleUrls: [] // global styling only
})
export class SettingsComponent {
  themes: { key: ThemeName; label: string; color: string }[] = [
    { key: 'light', label: 'Light', color: '#f4f6f9' },
    { key: 'dark', label: 'Dark', color: '#10141c' },
    { key: 'blue', label: 'Ocean Blue', color: '#0d2a5c' },
  ];

  fonts: { key: FontName; label: string }[] = [
    { key: 'poppins', label: 'Poppins' },
    { key: 'roboto', label: 'Roboto' },
    { key: 'inter', label: 'Inter' },
  ];

  constructor(public theme: ThemeService) {}

  selectTheme(t: ThemeName) { this.theme.setTheme(t); }
  selectFont(event: Event) {
    const value = (event.target as HTMLSelectElement).value as FontName;
    this.theme.setFont(value);
  }
}
