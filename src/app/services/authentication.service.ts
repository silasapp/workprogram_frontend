import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { map, retry } from 'rxjs/operators';

import { environment } from 'src/environments/environment';
import { User } from '../models/user';
//import { UserLocation } from '../models/appUser.model';
import { ModalService } from './modal.service';
import { tokenNotExpired } from '../helpers/tokenNotExpired';
import { IAuthData } from '../models/application-details';

@Injectable({ providedIn: 'root' })
export class AuthenticationService {
  private currentUserSubject: BehaviorSubject<User>;
  public currentUser: Observable<User | IAuthData>;
  private num = 2;
  public code = '6x0x5x1x';
  public isLoggedIn: boolean;
  public currentUser$ = new Subject<any>();
  private _isLoggedIn = false;
  private _isLoggedIn$ = new Subject<boolean>();

  myUserName: string;
  myPassword: string;
  myConfirmPassword: string;
  private secretKey = '8080808080805010';

  constructor(private http: HttpClient, private modalService: ModalService) {
    debugger;
    this.currentUserSubject = new BehaviorSubject<User>(
      JSON.parse(localStorage.getItem('currentUser'))
    );
    this.currentUser = this.currentUserSubject.asObservable();
  }

  public get currentUser_() {
    return JSON.parse(localStorage.getItem('currentUser'));
  }

  login(
    userId: string // email: string, code: string
  ) {
    return this.http
      .get<any>(`${environment.apiUrl}/account/AuthenticateById?id=${userId}`)
      .pipe(
        retry(this.num),
        map((authData: User) => {
          // store user details and jwt token in local storage to keep user logged in between page refreshes
          if (!authData) {
            return null;
          }

          const user = authData;
          const token = authData.token;

          if (!token) return null;

          localStorage.setItem('currentUser', JSON.stringify(user));
          localStorage.setItem('token', JSON.stringify(token));

          this.currentUserSubject.next(user);
          this.currentUser$.next(user);

          this._isLoggedIn = true;
          this._isLoggedIn$.next(true);
          return user;
        })
      );
  }

  logout() {
    // remove user from local storage to log user out

    // localStorage.removeItem('currentUser');
    // localStorage.removeItem('token');
    localStorage.clear();

    //console.log('Called logout..', localStorage.getItem('currentUser'));

    this.currentUserSubject.next(null);
    this._isLoggedIn = false;
    debugger;
    window.location.assign(`${environment.apiUrl}/auth/log-out`);
  }

  public get isLoggedIn_() {
    return tokenNotExpired();
  }

  public get currentUserValue(): User {
    return this.currentUserSubject.value;
  }

  elpslogin(email: string, password: string) {
    return this.http
      .post<any>(`${environment.apiUrl}/auth/userauth`, {
        email: email,
        code: password,
      })
      .pipe(
        retry(this.num),
        map((user) => {
          if (user.code === 1) {
            // store user details and jwt token in local storage to keep user logged in between page refreshes
            localStorage.setItem('currentUser', JSON.stringify(user));
            //localStorage.setItem('iden', user.id);
            this.currentUserSubject.next(user);
            this.isLoggedIn = true;
            return user;
          }
          return user;
        })
      );
  }

  // login(email: string, password: string) {
  //   return this.http
  //     .post<any>(`${environment.apiUrl}/account/authenticate`, {
  //       email: email,
  //       password: password,
  //     })
  //     .pipe(
  //       retry(this.num),
  //       map((user) => {
  //         if (user.code === 1) {
  //           // store user details and jwt token in local storage to keep user logged in between page refreshes
  //           localStorage.setItem('currentUser', JSON.stringify(user));
  //           //localStorage.setItem('iden', user.id);
  //           this.currentUserSubject.next(user);
  //           this.isLoggedIn = true;
  //           return user;
  //         }
  //         return user;
  //       })
  //     );
  // }

  dllogin(username: string, password: string) {
    return this.http
      .post<any>(`${environment.apiUrl}/account/dlogin`, {
        username: username,
        password: password,
      })
      .pipe(
        retry(this.num),
        map((user) => {
          // store user details and jwt token in local storage to keep user logged in between page refreshes
          localStorage.setItem('currentUser', JSON.stringify(user));
          this.currentUserSubject.next(user);
          return user;
        })
      );
  }
  register(solids: any) {
    return this.http
      .post<any>(`${environment.apiUrl}/account/register`, solids)
      .pipe(
        retry(this.num),
        map((user) => {
          // store user details and jwt token in local storage to keep user logged in between page refreshes
          localStorage.setItem('currentUser', JSON.stringify(user));
          this.currentUserSubject.next(user);
        })
      );
  }
  dregister(solids: HttpParams) {
    return this.http
      .post<any>(`${environment.apiUrl}/account/placeDey`, solids)
      .pipe(
        retry(this.num),
        map((user) => {
          // store user details and jwt token in local storage to keep user logged in between page refreshes
          localStorage.setItem('currentUser', JSON.stringify(user));
          localStorage.setItem('iden', user.id);
          this.currentUserSubject.next(user);
        })
      );
  }

  // logout() {
  //   // remove user from local storage to log user out
  //   localStorage.removeItem('currentUser');
  //   //localStorage.removeItem('iden');
  //   this.currentUserSubject.next(null);
  //   this.isLoggedIn = false;
  // }

  verifyCode(code: string) {
    return this.http
      .get<any>(`${environment.apiUrl}/account/verifyCompanyCode`, {
        params: { companyCode: code },
      })
      .pipe(retry(this.num));
  }

  changeCode(oldcode: string, email: string, newcode: string) {
    return this.http
      .post<any>(`${environment.apiUrl}/account/checkNewPinCode`, '', {
        params: {
          oldCompanyCode: oldcode,
          email: email,
          newCompanyCode: newcode,
        },
      })
      .pipe(retry(this.num));
  }

  createUser(
    companyName: string,
    companyCode: string,
    name: string,
    designation: string,
    phone: string,
    email: string,
    password: string
  ) {
    return this.http
      .post<any>(`${environment.apiUrl}/account/createCompanyResource`, {
        companyName: companyName,
        companyCode: companyCode,
        name: name,
        designation: designation,
        phone: phone,
        email: email,
        password: password,
      })
      .pipe(retry(this.num));
  }

  createStaff(body: any) {
    return this.http.post<any>(
      `${environment.apiUrl}/account/createStaffNew`,
      body
    );
  }

  updateStaff(body: any) {
    return this.http.post<any>(
      `${environment.apiUrl}/account/updateStaffNew`,
      body
    );
  }

  getCompanyResource(companyCode: string) {
    return this.http
      .get<any>(`${environment.apiUrl}/account/getCompanyResource`, {
        params: { companyCode: companyCode },
      })
      .pipe(retry(this.num));
  }

  deleteCompanyResource(id: string, companyCode: string) {
    return this.http
      .post<any>(`${environment.apiUrl}/account/deleteCompanyResource`, '', {
        params: { id: id, companyCode: companyCode },
      })
      .pipe(retry(this.num));
  }

  returnPasswordInfo(email: string) {
    return this.http
      .post<any>(`${environment.apiUrl}/account/returnPasswordInfo`, '', {
        params: { email: email },
      })
      .pipe(retry(this.num));
  }

  changePassword(userId: string, token: string, password: string) {
    return this.http
      .get<any>(`${environment.apiUrl}/account/changePassword`, {
        params: { userId: userId, token: token, password: password },
      })
      .pipe(retry(this.num));
  }

  // encryptData(data: string) {
  //     var key = CryptoJS.enc.Utf8.parse(this.secretKey);
  //     var iv = CryptoJS.enc.Utf8.parse(this.secretKey);
  //     return CryptoJS.AES.encrypt(CryptoJS.enc.Utf8.parse(data), key,
  //     {
  //         keySize: 128 / 8,
  //         iv: iv,
  //         mode: CryptoJS.mode.CBC,
  //         padding: CryptoJS.pad.Pkcs7
  //     }).toString();
  // }

  // decryptData(data: string) {
  //     var key = CryptoJS.enc.Utf8.parse(this.secretKey);
  //     var iv = CryptoJS.enc.Utf8.parse(this.secretKey);
  //     return CryptoJS.AES.decrypt(data, key,
  //     {
  //         keySize: 128 / 8,
  //         iv: iv,
  //         mode: CryptoJS.mode.CBC,
  //         padding: CryptoJS.pad.Pkcs7
  //     }).toString(CryptoJS.enc.Utf8);
  // }
}
