import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable()
export class NominatimService {

    constructor(private httpClient: HttpClient) { }

    public getCoordinates(locationData: any) {
        const url = `https://nominatim.openstreetmap.org/search/${locationData.country}/${locationData.location}?format=json`;
        return this.httpClient.get<any>(url).toPromise().then(response => {
            return Promise.resolve(response);
        })
    }
}