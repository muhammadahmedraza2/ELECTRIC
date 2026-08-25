import { Injectable, inject } from '@angular/core';
import { DatePipe } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class EncrDecrService {
  buildCallbackChecksum(arg0: string) {
    throw new Error('Method not implemented.');
  }
//   // Explicit type + inject() instead of constructor injection.
//   private datePipe: DatePipe = inject(DatePipe);

//   private key = CryptoJS.enc.Utf8.parse('12345678901234567890123456789012');
//   private iv = CryptoJS.enc.Utf8.parse('1234567890123456');

//   Encrypt_obj(value: unknown, at: string): string {
//     const encryptedData = encodeURIComponent(
//       CryptoJS.AES.encrypt(JSON.stringify(value), at).toString()
//     );
//     return encryptedData;
//   }

//   Encrypt_val(value: string): string {
//     const data = new Date().toLocaleString('en-US', { timeZone: 'Asia/Karachi' });
//     const ekey = this.datePipe.transform(data, 'yyyyMMddHH') ?? '';
//     const encryptedData = CryptoJS.AES.encrypt(value, ekey).toString();
//     return encryptedData;
//   }

//   // The get method is used for decrypting the value.
//   Decrypt_obj(value: string, at: string): any {
//     const decryptedData = CryptoJS.AES.decrypt(decodeURIComponent(value), at);
//     const obj_mnu = JSON.parse(decryptedData.toString(CryptoJS.enc.Utf8));
//     return obj_mnu;
//   }

//   Decrypt_val(value: string): string {
//     const data = new Date().toLocaleString('en-US', { timeZone: 'Asia/Karachi' }); // dd MMM yyyy hh
//     const ekey = this.datePipe.transform(data, 'yyyyMMddHH') ?? '';
//     const decryptedData = CryptoJS.AES.decrypt(value, ekey);
//     return decryptedData.toString(CryptoJS.enc.Utf8);
//   }

//   Password_val(value: string): string {
//     const plainText = value;
//     const data = new Date().toLocaleString('en-US', { timeZone: 'Asia/Karachi' });
//     const secret = 'CR-PL_' + (this.datePipe.transform(data, 'yyyyMMddHH') ?? '');
//     const key = CryptoJS.enc.Utf8.parse(secret);
//     const encryptedBytes = CryptoJS.AES.encrypt(plainText, key, {
//       mode: CryptoJS.mode.ECB,
//       padding: CryptoJS.pad.Pkcs7
//     });
//     return encryptedBytes.toString();
//   }

//   Enc_JWT(value: string): string {
//     const ekey = 'CR-PL_12345678';
//     return CryptoJS.AES.encrypt(value, ekey).toString();
//   }

//   Dec_JWT(value: string): string {
//     const ekey = 'CR-PL_12345678';
//     const decryptedData = CryptoJS.AES.decrypt(value, ekey);
//     return decryptedData.toString(CryptoJS.enc.Utf8);
//   }

//   buildCallbackChecksum(payload: string): string {
//     const hashedPayload = CryptoJS.SHA256(payload).toString(CryptoJS.enc.Base64);
//     return hashedPayload.replace(/\+/g, '-').replace(/\//g, '_');
//   }

//   encrypt(text: string): string {
//     const encrypted = CryptoJS.AES.encrypt(text, this.key, {
//       iv: this.iv,
//       mode: CryptoJS.mode.CBC,
//       padding: CryptoJS.pad.Pkcs7
//     });
//     return encrypted.toString(); // Base64
//   }

//   decrypt(cipherText: string): string {
//     const bytes = CryptoJS.AES.decrypt(cipherText, this.key, {
//       iv: this.iv,
//       mode: CryptoJS.mode.CBC,
//       padding: CryptoJS.pad.Pkcs7
//     });
//     return bytes.toString(CryptoJS.enc.Utf8);
//   }
}