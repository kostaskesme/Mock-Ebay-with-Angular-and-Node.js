import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { environment } from '../../environments/environment';

@Injectable()
export class AuthenticationService {

    constructor(
        private httpClient: HttpClient) {
    }

    public authenticate(logdata: any): Promise<boolean> {
        const url = `${environment.appUrl}/login`;
        return this.httpClient.post<any>(url, logdata).toPromise().then(response => {
            return Promise.resolve(response.isLoggedIn);
        });
    }
    public register(registerData: any) {
        const url = `${environment.appUrl}/users/register`;
        return this.httpClient.post<any>(url, registerData).toPromise().then(response => {
            return Promise.resolve(response);
        })
    }
}