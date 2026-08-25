import { Injectable, signal,inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { AppSettingsService } from './appsetting.service';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private appSettings = inject(AppSettingsService);
  private _accessToken = signal<string | null>(null);
  private _expiry = signal<string | null>(null);

  readonly accessToken = this._accessToken.asReadonly();

  private readonly REFRESH_COOKIE = 'REFRESH-TOKEN';
  private readonly REFRESH_API = `${this.appSettings.getValue('adminModuleUrl')}Auth/refreshToken`;

  constructor(private http: HttpClient) { }

  // ── Called after successful login ──────────────────────────────────────────
  login(res: any): void {
    this._accessToken.set(res.accessToken);
    this._expiry.set(res.expiry);
    this.setRefreshCookie(res.refreshToken);
  }

  // ── Returns in-memory access token (null if expired) ──────────────────────
  getToken(): string | null {
    const expiry = this._expiry();
    if (expiry && new Date() > new Date(expiry)) {
      this._accessToken.set(null); // expired, clear memory only
      return null;
    }
    return this._accessToken();
  }

  isLoggedIn(): boolean {
    return !!this.getToken();
  }

  // ── Reads refresh token from cookie and calls the refresh API ──────────────
  refreshAccessToken(): Observable<any> {
    const refreshToken = this.getRefreshCookie();
    const body = {
      username: '',
      password: '',
      userSession: refreshToken ?? '',
      userToken: ''
    };

    return this.http.post<any>(this.REFRESH_API, body).pipe(
      tap((res) => {
        if (res.responseCode === 0 && res.accessToken) {
          this._accessToken.set(res.accessToken);
          this._expiry.set(res.expiry);
          this.setRefreshCookie(res.refreshToken); // rotate cookie too
        }
      })
    );
  }

  hasRefreshToken(): boolean {
    return !!this.getRefreshCookie();
  }

  logout(): void {
    this._accessToken.set(null);
    this._expiry.set(null);
    this.clearRefreshCookie();
  }

  // ── Cookie helpers ─────────────────────────────────────────────────────────
  private setRefreshCookie(token: string): void {
    // HttpOnly can't be set from JS — set Secure + SameSite at minimum
    document.cookie = `${this.REFRESH_COOKIE}=${token}; path=/; SameSite=Strict`;
  }

  getRefreshCookie(): string | null {
    const match = document.cookie
      .split('; ')
      .find((row) => row.startsWith(`${this.REFRESH_COOKIE}=`));
    return match ? match.split('=')[1] : null;
  }

  private clearRefreshCookie(): void {
    document.cookie = `${this.REFRESH_COOKIE}=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT`;
  }

  
}