import { HttpClient } from '@angular/common/http';
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

    public profile(id: string) {
        const url = `${environment.appUrl}/users/${id}`;
        return this.httpClient.get<any>(url).toPromise().then(response => {
            return Promise.resolve(response);
        })
    }

    public approve(id: string) {
        const url = `${environment.appUrl}/users/approve`;
        return this.httpClient.put<any>(url, id).toPromise().then(response => {
            return Promise.resolve(response);
        })

    }


}

