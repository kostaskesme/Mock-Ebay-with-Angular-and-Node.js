import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
  })
};

@Injectable()
export class MessageService {

  constructor(private httpClient: HttpClient) {
  }

  public getMessageSender(id: string) {
    const url = `${environment.appUrl}/getMessageSender/${id}`;
    return this.httpClient.get<any>(url).toPromise().then(response => {
      return Promise.resolve(response);
    });
  }

  public getMessageReceiver(id:string) {
    const url = `${environment.appUrl}/getMessageReceiver/${id}`;
    return this.httpClient.get<any>(url).toPromise().then(response => {
      return Promise.resolve(response);
    });
  }

  public sendMessage(messageData: any) {
    const url = `${environment.appUrl}/postMessage`;
    return this.httpClient.post<any>(url, messageData, httpOptions).toPromise().then(response => {
      return Promise.resolve(response);
    });
  }

  public deleteMessage(id:string) {
    const url = `${environment.appUrl}/deleteMessage/${id}`;
    return this.httpClient.get<any>(url).toPromise().then(response => {
      return Promise.resolve(response);
    });
  }

}
