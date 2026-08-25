import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class AppSettingsService {
  private settings: any = (window as any).__appSettings || {};

  getValue(key: string): any {
    return this.settings[key];
  }
}