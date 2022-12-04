import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiMethods } from '../../utils/api-methods';

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

  callApi(endpoint: string, method: ApiMethods, auth: Boolean, body?: any) {
    const requestOptions = { headers: this.getHeaders(auth) };
    switch (method) {
      case ApiMethods.GET:
        return this.http.get(endpoint, requestOptions);
      case ApiMethods.POST:
        return this.http.post(endpoint, body, requestOptions);
      case ApiMethods.PUT:
        return this.http.put(endpoint, body, requestOptions);
    }
    return this.http.get(endpoint, requestOptions);
  }

  getHeaders(auth: Boolean): HttpHeaders {
    let api_key = this.getToken();
    let headers;
    if (auth) {
      headers = new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${api_key}`
      });
    } else {
      headers = new HttpHeaders({
        'Content-Type': 'application/json'
      });
    }
    return headers;
  }

  getToken() {
    return sessionStorage.getItem('token')
  }
}
