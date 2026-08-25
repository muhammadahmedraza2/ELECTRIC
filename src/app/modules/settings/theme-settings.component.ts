import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ThemeService, ThemeMode, FontFamily, FontSize, SidebarMode } from '../../core/services/theme.service';
import { ToastService } from '../../core/services/toast.service';

@Component({
  selector: 'app-theme-settings',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './theme-settings.component.html',
  styleUrls: []
})
export class ThemeSettingsComponent {
  fonts: FontFamily[] = ['Inter', 'Roboto', 'Poppins', 'Open Sans', 'Arial'];
  fontSizes: FontSize[] = ['small', 'medium', 'large'];
  colorPresets = ['#3457d5', '#6d5bf5', '#17b26a', '#f04438', '#f5a524', '#0ea5e9'];

  constructor(public theme: ThemeService, private toast: ToastService) {}

  setMode(mode: ThemeMode) { this.theme.update({ mode }); }
  setColor(color: string) { this.theme.update({ primaryColor: color }); }
  setFont(event: Event) { this.theme.update({ font: (event.target as HTMLSelectElement).value as FontFamily }); }
  setFontSize(size: FontSize) { this.theme.update({ fontSize: size }); }
  setSidebarMode(mode: SidebarMode) { this.theme.update({ sidebarMode: mode }); }

  reset() {
    this.theme.resetToDefault();
    this.toast.show('Theme reset to default', 'info');
  }
}
