import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  httpOptionss = {
    headers: new HttpHeaders({
      'Access-Control-Allow-Origin': '*',
      'Content-Type': 'application/json'
    })
  };

  constructor(private http: HttpClient) { }

  callApi(endpoint: string) {
    let headers = new HttpHeaders();
    headers.append('Access-Control-Allow-Origin', '*')
    return this.http.get(endpoint, { headers });
  }

  getHeaders(): HttpHeaders {
    return new HttpHeaders;
  }
}
