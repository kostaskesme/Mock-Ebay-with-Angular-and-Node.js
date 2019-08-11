import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { environment } from '../../environments/environment';

@Injectable()
export class AuthenticationService {

    constructor(
        private httpClient: HttpClient) {
    }

    public authenticate(email: string, password: string): Promise<boolean> {
        const url = `${environment.appUrl}/login`;
        return this.httpClient.post<{ isLoggedIn: boolean }>(url, {
            logemail : email,
            logpassword: password
         }).toPromise().then(response => {
            return Promise.resolve(response.isLoggedIn);
        });
    }
    public register(){
        
    }

    //public register()
}