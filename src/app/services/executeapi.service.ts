import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable, firstValueFrom } from 'rxjs';
import { Router } from '@angular/router';
import { appConst } from '../shared/appconst';
import { DialogService } from './dialog.service';
import { EncrDecrService } from './EncrDecr.Service';

interface GeoLocation {
  lat: number;
  lng: number;
}

@Injectable({
  providedIn: 'root'
})
export class ExecuteAPICall {
  private getGeoLocation: GeoLocation | null = null;

  private http: HttpClient = inject(HttpClient);
  private EncrDecr: EncrDecrService = inject(EncrDecrService);
  public dialogService: DialogService = inject(DialogService);
  public router: Router = inject(Router);

  public CallMicroService(APIUrl: string, reqpack: any): Observable<any> {
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this.http.post<any>(APIUrl, reqpack, { headers });
  }

  public CallMicroServiceFormData(APIUrl: string, body: FormData): Observable<any> {
    const headers = new HttpHeaders();
    return this.http.post<any>(APIUrl, body, { headers });
  }

  public async GetAPIResult(APIUrl: string, reqpack: any): Promise<any | undefined> {
    let returnresp: any | undefined;
    try {
      const response = await firstValueFrom(this.CallMicroService(APIUrl, reqpack));

      if (response?.Data?.Description?.includes('Invalid User Request...Access Denied.')) {
        this.dialogService.alertBox('Your session is active on another device.');
        return;
      }

      if (appConst.IsSignatureCheck === 'Y' && response?.Data) {
        const encryptedGetData = this.EncrDecr.buildCallbackChecksum(JSON.stringify(response.Data));
        if (encryptedGetData != response.Signature) {
          const APIURL = appConst.LogWriter.concat('LogWriter');
          await this.GetAPIResult(APIURL, response.Data);
        }
      }

      return response;
    } catch (e: unknown) {
      const err = e as { status?: number; message?: string };

      if (err.status === 429) {
        const encryptedData = this.EncrDecr.buildCallbackChecksum(JSON.stringify({
          Code: '-1',
          Description: 'To many request'
        }));
        returnresp = {
          Data: { Code: '-1', Description: 'To many request' },
          Signature: encryptedData
        } as any;
        this.router.navigate(['/toManyRequest']);
      } else if (err.status === 0 && err.message?.includes('failure response for')) {
        const encryptedData = this.EncrDecr.buildCallbackChecksum(JSON.stringify({
          Code: '-1',
          Description: 'server not responding'
        }));
        returnresp = {
          Data: { Code: '-1', Description: 'server not responding' },
          Signature: encryptedData
        } as any;
      }

      return returnresp;
    }
  }

  public async GetAPIFormDataResult(APIUrl: string, body: FormData): Promise<any | undefined> {
    let returnresp: any | undefined;
    try {
      return await firstValueFrom(this.CallMicroServiceFormData(APIUrl, body));
    } catch (e: unknown) {
      const err = e as { status?: number; message?: string };

      if (err.status === 429) {
        const encryptedData = this.EncrDecr.buildCallbackChecksum(JSON.stringify({
          Code: '-1',
          Description: 'To many request'
        }));
        returnresp = {
          Data: { Code: '-1', Description: 'To many request' },
          Signature: encryptedData
        } as any;
        this.router.navigate(['/toManyRequest']);
      } else if (err.status === 0 && err.message?.includes('failure response for')) {
        const encryptedData = this.EncrDecr.buildCallbackChecksum(JSON.stringify({
          Code: '-1',
          Description: 'server not responding'
        }));
        returnresp = {
          Data: { Code: '-1', Description: 'server not responding' },
          Signature: encryptedData
        } as any;
      }
      return returnresp;
    }
  }

  public async OTPValidate(OTP: string, FormID: string): Promise<string> {
    try {
      const APIURL = appConst.OTPAPI + 'ValidateOTP';
      const req_body = JSON.stringify({
        Data: {
          UserID: sessionStorage.getItem('usrname'),
          UserPIN: OTP,
          AccessToken: sessionStorage.getItem('AccessToken'),
          FormID: FormID
        },
        Signature: this.EncrDecr.buildCallbackChecksum(JSON.stringify({
          UserID: sessionStorage.getItem('usrname'),
          UserPIN: OTP,
          AccessToken: sessionStorage.getItem('AccessToken'),
          FormID: FormID
        }))
      });

      const response = await firstValueFrom(this.CallMicroService(APIURL, req_body));
      const encryptedGetData = this.EncrDecr.buildCallbackChecksum(JSON.stringify(response.Data));

      if (appConst.IsSignatureCheck === 'Y' && encryptedGetData != response.Signature) {
        this.dialogService.alertBox(appConst.InvalidResponseError);
        return '';
      }

      return response.Data.Code + response.Data.Description;
    } catch (e: unknown) {
      return '-1' + String(e);
    }
  }

  getCurrentLocation(): Promise<GeoLocation | null> {
    return new Promise<GeoLocation | null>((resolve, reject) => {
      if (!navigator.geolocation) {
        this.getGeoLocation = null;
        reject('Geolocation is not supported by this browser.');
        return;
      }

      navigator.geolocation.getCurrentPosition(
        (position: GeolocationPosition) => {
          const lat = position.coords.latitude;
          const lng = position.coords.longitude;
          this.getGeoLocation = { lat, lng };
          resolve(this.getGeoLocation);
        },
        (error: GeolocationPositionError) => {
          this.dialogService.alertBox(error.message);
          this.getGeoLocation = null;
          resolve(null);
        }
      );
    });
  }
}