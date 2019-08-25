import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json',
    //'Authorization': 'my-auth-token'
  })
};

@Injectable()
export class AuctionService {

  constructor(private httpClient: HttpClient, ) {
  }
  public createAuction(itemid: any, name: any, categ: any[], buyPrice: any, fbid: any,
     loc: any, count: any, ends: any, rat: any, userid: any, desc: any ) {
    const url = `${environment.appUrl}/newAuction`;
    const auction = {
      "ItemID": itemid,
      "Name": name,
      "Category": categ,
      "Currently": fbid,
      "Buy_Price": buyPrice,
      "First_Bid": fbid,
      "Location": loc,
      "Country": count,
      "Ends": ends,
      "Seller": {
        "Rating": rat,
        "UserID": userid
      },
      "Description": desc
    }

    return this.httpClient.post<any>(url, auction, httpOptions).toPromise().then(response => {
      return Promise.resolve(response);
    })
  }

  public viewAuction(id: string) {
    const url = `${environment.appUrl}/getAuction/${id}`;
    return this.httpClient.get<any>(url).toPromise().then(response => {
      return Promise.resolve(response);
    })
  }

  public viewAllAuctions(){
    const url = `${environment.appUrl}/getAuction`;
    return this.httpClient.get<any>(url).toPromise().then(response =>{
      return Promise.resolve(response);
    })
  }

  public bidAuction(rat: number, id: string, loc: string, count: string, amount: number) {
    const url = `${environment.appUrl}/bidAuction/${id}`;
    const bid = {
      "Bidder": {
        "Rating": rat,
        "UserID": id,
        "Location": loc,
        "Country": count
      },
      "Amount": amount
    }

    return this.httpClient.post<any>(url, bid, httpOptions).toPromise().then(response => {
      return Promise.resolve(response);
    })
  }
}
