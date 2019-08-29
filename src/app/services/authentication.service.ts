import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { environment } from '../../environments/environment';
import { RequestOptions } from '@angular/http';

@Injectable()
export class AuthenticationService {

    constructor(
        private httpClient: HttpClient) {
    }

    public authenticate(logdata: any): Promise<any> {
        const url = `${environment.appUrl}/login`;
        const httpPostOptions = { headers: new HttpHeaders(), withCredentials: true };
        return this.httpClient.post<any>(url, logdata, httpPostOptions).toPromise().then(response => {
            return Promise.resolve(response);
        });
    }
    public register(registerData: any) {
        const url = `${environment.appUrl}/register`;
        return this.httpClient.post<any>(url, registerData).toPromise().then(response => {
            return Promise.resolve(response);
        })
    }
}