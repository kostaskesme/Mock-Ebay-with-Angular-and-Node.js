import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
  })
};

@Injectable()
export class AuctionService {

  constructor(private httpClient: HttpClient, private cookieService: CookieService, private router: Router) {
  }
  public createAuction(auctionData: any) {
    const url = `${environment.appUrl}/newAuction`;
    return this.httpClient.post<any>(url, auctionData, httpOptions).toPromise().then(response => {
      return Promise.resolve(response);
    })
  }

  public viewAuction(id: string) {
    const url = `${environment.appUrl}/getAuction/${id}`;
    return this.httpClient.get<any>(url).toPromise().then(response => {
      return Promise.resolve(response);
    })
  }

  public viewAllAuctions() {
    const url = `${environment.appUrl}/getAuction`;
    return this.httpClient.get<any>(url).toPromise().then(response => {
      return Promise.resolve(response);
    })
  }

  public viewAuctionsBySeller(id:string) {
    const url = `${environment.appUrl}/getAuctionsBySeller/${id}`;
    return this.httpClient.get<any>(url).toPromise().then(response => {
      return Promise.resolve(response);
    })
  }

  public startAuction(id:string, endTime: any) {
    const url = `${environment.appUrl}/startAuction/${id}`;
    return this.httpClient.post<any>(url, endTime, httpOptions).toPromise().then(response => {
      return Promise.resolve(response);
    })
  }

  public searchAuction(option:string, term:string) {
    const url = `${environment.appUrl}/searchAuction/${option}/${term}`;
    return this.httpClient.get<any>(url).toPromise().then(response => {
      return Promise.resolve(response);
    })
  }

  public bidAuction(id:string, bidData : any) {
    const url = `${environment.appUrl}/bidAuction/${id}`;
    return this.httpClient.post<any>(url, bidData, httpOptions).toPromise().then(response => {
      return Promise.resolve(response);
    })
  }

  public editAuction(id:string, auctionData: any) {
    const url = `${environment.appUrl}/updateAuction/${id}`;
    return this.httpClient.post<any>(url, auctionData, httpOptions).toPromise().then(response => {
      return Promise.resolve(response);
    })
  }

  public deleteAuction(id:string) {
    const url = `${environment.appUrl}/deleteAuction/${id}`;
    return this.httpClient.get<any>(url).toPromise().then(response => {
      return Promise.resolve(response);
    })
  }

  public newAuctionRedirect() {
    if (!(this.cookieService.check('usersCookie'))) {
      alert('Not Authorized!');
    }
    else {
      this.router.navigate(['/newAuction']);
    }

  }
}
