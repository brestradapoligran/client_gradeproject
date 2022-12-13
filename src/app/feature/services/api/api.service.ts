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

  callApi(endpoint: string, method: ApiMethods, auth: Boolean, newHeaders: Map<string, string>, body?: any,) {
    const requestOptions = { headers: this.getHeaders(auth, newHeaders) };
    console.log(requestOptions)
    console.log(newHeaders)
    switch (method) {
      case ApiMethods.GET:
        return this.http.get(endpoint, requestOptions);
      case ApiMethods.POST:
        return this.http.post(endpoint, body, requestOptions);
      case ApiMethods.PUT:
        return this.http.put(endpoint, body, requestOptions);
      case ApiMethods.DELETE:
        return this.http.delete(endpoint, requestOptions);
    }
  }

  getHeaders(auth: Boolean, newHeaders: Map<string, string>): HttpHeaders {
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });

    if (auth) {
      let api_key = this.getToken();
      headers = headers.append('Authorization', `Bearer ${api_key}`);
    }

    newHeaders.forEach((value: string, key: string) => headers = headers.append(key, value));

    return headers;
  }

  getToken() {
    return sessionStorage.getItem('token')
  }
}
