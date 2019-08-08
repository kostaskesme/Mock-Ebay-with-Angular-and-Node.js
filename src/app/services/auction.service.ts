import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Auction } from '../models/auction.type';
@Injectable()
export class AuctionService {

    constructor(private httpClient: HttpClient, ) {
    }

    public createAuction(firstBid: any, buyPrice: any ) {
        const url = `${environment.appUrl}/newAuction`;
        return this.httpClient.post<any>(url,
            {
                firstBid: firstBid,
                noOfBids: 0,
                startTime: this.getDateTime(),
                currentBid: firstBid,
                buyPrice: buyPrice,
            }).toPromise().then(response => {
                console.log('AuctionService');
                console.log(response);
                return Promise.resolve(response);
            })
    }

    public viewAuction(id: string) {
        const url = `${environment.appUrl}/getAuction/${id}`;
        return this.httpClient.get<any>(url).toPromise().then(response => {
            return Promise.resolve(response);
        })
    }

    getDateTime = function () {
        var today = new Date();
        var date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
        var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
        var dateTime = date + ' ' + time;
        return dateTime;
    }
}