import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { environment } from '../environments/environment';

@Injectable()
export class AuthenticationService {

    constructor(
        private httpClient: HttpClient) {
    }

    public authenticate(logemail: string, logpassword: string): Promise<boolean> {
        const url = `${environment.appUrl}/login`;
        return this.httpClient.get<{ isLoggedIn: boolean }>(url, {
            params: new HttpParams()
                .append('logemail', logemail)
                .append('logpassword', logpassword)
        }).toPromise().then(response => {
            return Promise.resolve(response.isLoggedIn);
        });
    }
}