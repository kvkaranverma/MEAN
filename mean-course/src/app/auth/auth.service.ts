import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AuthData } from './auth-data.model';
import { Subject } from 'rxjs';
import { Router } from '@angular/router';

import { environment } from "../../environments/environment";

const BACKEND_URL = environment.apiUrl+ '/user';

@Injectable({providedIn: 'root'})
export class AuthService {
    private userId: string;
    private isAuthenticated: boolean = false;
    private token;
    private authStatusListener = new Subject<boolean>();
    private tokenTimer: any;

    constructor(private http: HttpClient, private router: Router) {}

    getToken() {
        return this.token;
    }

    getIsAuth() {
        return this.isAuthenticated;
    }

    getAuthStatusListener() {
        return this.authStatusListener.asObservable();
    }

    getUserId() {
        return this.userId;
    }

    createUser(email: string, password: string) {
        const authData: AuthData = {email, password};
        return this.http.post(BACKEND_URL+'/signup', authData)
            .subscribe(response => {
                this.router.navigate['/'];
            }, error => {
                this.authStatusListener.next(false);
            })
    }

    loginUser(email: string, password: string) {
        const authData: AuthData = {email, password};
        console.log(authData)
        this.http.post<{token: string, expiresIn: number, userId: string}>(BACKEND_URL+'/login', authData)
            .subscribe(response => {
                const token  = response.token;
                this.token = token;
                if(token) {
                    const expiresInDuration = response.expiresIn;
                    this.setAuthTimer(expiresInDuration)
                    this.isAuthenticated = true;
                    this.userId = response.userId;
                    const now = new Date();
                    const expirationDate = new Date(now.getTime() + expiresInDuration * 1000);
                    console.log(expirationDate);
                    this.saveAuthData(token, expirationDate, response.userId);
                    this.authStatusListener.next(true);
                }
            }, error => {
                this.authStatusListener.next(false);
            })
    }

    autoAuthUser() {
        const authInformation = this.getAuthData();
        if(!authInformation) {
            return
        }
        const now = new Date();
        const expiresIn = authInformation.expirationDate.getTime() - now.getTime();
      
        if(expiresIn > 0) {
            this.token = authInformation.token;
            this.isAuthenticated = true;
            this.userId = authInformation.userId;
            this.setAuthTimer(expiresIn / 1000);
            this.authStatusListener.next(true);
        }
    }

    logout() {
        this.token = null;
        this.isAuthenticated = false;
        this.authStatusListener.next(false);
        this.clearAuthData();
        this.userId = null;
        clearTimeout(this.tokenTimer);
    }

    private setAuthTimer(duration: number) {
        console.log('Setting timer: ' + duration);
        this.tokenTimer = setTimeout(() => {
            this.logout();
        }, duration * 1000);
    }

    private saveAuthData(token: string, expirationDate: Date, userId: string) {
        localStorage.setItem('token', token);
        localStorage.setItem('expiration', expirationDate.toISOString());
        localStorage.setItem('userId', userId);
    }

    private clearAuthData() {
        localStorage.removeItem('token');
        localStorage.removeItem('expiration');
        localStorage.removeItem('userId');
    }

    private getAuthData() {
        const token = localStorage.getItem('token');
        const expirationDate = localStorage.getItem('expiration');
        const userId = localStorage.getItem('userId');
        if(!token || !expirationDate) {
            return
        }
        return {
            token,
            expirationDate: new Date(expirationDate),
            userId
        }
    }
}