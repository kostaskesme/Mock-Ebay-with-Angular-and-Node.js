import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { User } from '../models/user.type';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';



@Injectable()
export class UserService {
    constructor(private httpClient: HttpClient, private cookieService: CookieService, private router: Router) { }

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
        //console.log(id);
        const url = `${environment.appUrl}/users/approve`;
        return this.httpClient.put<any>(url, { id: id }).toPromise().then(response => {
            return Promise.resolve(response);
        })

    }

    public logout() {
        this.cookieService.delete('usersCookie');
        this.router.navigate(['']);
    }

}

