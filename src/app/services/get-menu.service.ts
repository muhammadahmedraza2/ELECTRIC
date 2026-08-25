import { Injectable, inject, signal } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AppSettingsService } from './appsetting.service';

// ==========================
// INTERFACES
// ==========================

export interface SideMenuNode {
  PC_ID: number;
  NODE_ID: number;
  DESP: string;
}

export interface SideMenuForm {
  FORM_TITLE: string;
  SITE: string;
  FORM_ID: number;
  NODE_ID: number;
}

export interface SideMenuResponse {
  data: [SideMenuNode[], SideMenuForm[]];
  message: string;
}

// ==========================
// SERVICE
// ==========================

@Injectable({
  providedIn: 'root'
})
export class GetMenuService {
  openMenu = signal<any>(-1);
  isHelpOpen = signal(false);
  selectedFormId = signal<any>(null); // ← ADD
  private http = inject(HttpClient);
  private appSettings = inject(AppSettingsService);

  private apiUrl = `${this.appSettings.getValue('adminModuleUrl')}`

  constructor() { }

  // ==========================
  // GET MENU API
  // ==========================
  // getMenu(): Observable<SideMenuResponse> {
  //   return this.http.get<SideMenuResponse>(
  //     `${this.apiUrl}/Auth/MenuItem`
  //   );
  // }


  getMenu(): Observable<SideMenuResponse> {
    return this.http.get<SideMenuResponse>(
      `${this.apiUrl}Auth/MenuItem`
    );
  }
}