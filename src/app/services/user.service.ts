import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';

@Injectable()
export class UserService {
    constructor(private httpClient: HttpClient) { }

    public viewAllUsers() {
        const url = `${environment.appUrl}/users`;
        return this.httpClient.get<any>(url).toPromise().then(response => {
            return Promise.resolve(response);
        })
    }

    
}

