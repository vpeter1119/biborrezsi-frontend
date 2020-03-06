import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Router } from "@angular/router";
import { Subject } from "rxjs";

@Injectable({ providedIn: "root" })
export class AuthService {
  
  //apiUrl = 'https://br-server-staging.herokuapp.com/api/';
  apiUrl = 'https://biborrezsi-server.herokuapp.com/api/';
  
  private token: string;
  private tokenTimer: any;
  authStatus = false;
  private authStatusListener = new Subject<boolean>();
  errorMessage: string;
  private errorMessageListener = new Subject<string>();
  
  constructor(
    private _http: HttpClient,
    private _router: Router,
  ) {}

    getToken() {
    return this.token;
  }

  getAuthStatus() {
    return this.authStatus;
  }

  getAuthStatusListener() {
    return this.authStatusListener.asObservable();
  }

  getErrorMessage() {
    return this.errorMessage;
  }

  getErrorMessageListener() {
    return this.errorMessageListener.asObservable();
  }

  login(username: string, password: string) {
    const authData = {username: username, pw: password};
    const url = (this.apiUrl + "auth/login");
    this._http.post<{token: string, expiresIn: number, message: string, errcode: string}>(url, authData)
    .subscribe(response => {
      if (response.token) {
        //Handle successful login attempt
        console.warn("Succesful login attempt.");
        this.token = response.token;
        const expiresInDuration = response.expiresIn;
        this.setAuthTimer(expiresInDuration);
        this.authStatus = true;
        this.authStatusListener.next(true);
        const now = new Date();
        const expirationDate = new Date(now.getTime() + expiresInDuration * 100000);
        this.saveAuthData(this.token, expirationDate);
        this._router.navigate(["report"]);
      }
    }, error => {
      //Handle failed login attempt
      console.warn("Failed login attempt.");
      console.warn(error);
      this.errorMessage = error.statusText;
      this.errorMessageListener.next(this.errorMessage);      
      window.alert(this.errorMessage);
      this._router.navigate(["auth"]);
    });
  }

  logout() {
    this.token = null;
    this.authStatus = false;
    this.authStatusListener.next(false);
    clearTimeout(this.tokenTimer);
    this.clearAuthData();
    this._router.navigate(["auth"]);
  }

  //Set the authentication timer
  private setAuthTimer(duration: number) {
    this.tokenTimer = setTimeout(() => {
      this.logout();
    }, duration * 1000);
  }

  //Save authentication data to local storage
  private saveAuthData(token: string, expirationDate: Date) {
    localStorage.setItem("token", token);
    localStorage.setItem("expiration", expirationDate.toISOString());
  }

  //Clear authentication data from local storage
  private clearAuthData() {
    localStorage.removeItem("token");
    localStorage.removeItem("expiration");
  }

  //Read authentication data from local storage
  private getAuthData() {
    const token = localStorage.getItem("token");
    const expirationDate = localStorage.getItem("expiration");
    if (!token || !expirationDate) {
      return;
    }
    return {
      token: token,
      expirationDate: new Date(expirationDate)
    }
  }

}