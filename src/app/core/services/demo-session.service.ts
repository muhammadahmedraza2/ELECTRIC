import { isPlatformBrowser } from '@angular/common';
import { computed, effect, inject, Injectable, PLATFORM_ID, signal } from '@angular/core';

export interface DemoSession {
  email: string;
  businessTypeId: string | null;
}

const SESSION_KEY = 'erp_demo_session';

@Injectable({ providedIn: 'root' })
export class DemoSessionService {
  private readonly platformId = inject(PLATFORM_ID);
  private readonly state = signal<DemoSession | null>(this.readSession());

  readonly session = this.state.asReadonly();
  readonly isAuthenticated = computed(() => this.state() !== null);

  constructor() {
    effect(() => {
      if (!isPlatformBrowser(this.platformId)) return;
      const session = this.state();
      if (session) localStorage.setItem(SESSION_KEY, JSON.stringify(session));
      else localStorage.removeItem(SESSION_KEY);
    });
  }

  login(email: string, businessTypeId: string | null = null): void {
    this.state.set({ email: email.trim().toLowerCase(), businessTypeId });
  }

  setBusinessType(businessTypeId: string): void {
    this.state.update(session => session ? { ...session, businessTypeId } : session);
  }

  logout(): void {
    this.state.set(null);
  }

  private readSession(): DemoSession | null {
    if (!isPlatformBrowser(this.platformId)) return null;
    try {
      const session = JSON.parse(localStorage.getItem(SESSION_KEY) || 'null') as DemoSession | null;
      return session?.email ? session : null;
    } catch {
      return null;
    }
  }
}