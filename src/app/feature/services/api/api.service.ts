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

  callApi(endpoint: string, method:ApiMethods, body?:any) {
    let headers = new HttpHeaders();
    headers.append('Access-Control-Allow-Origin', '*')
    headers.append('Content-Type', 'application/json')
    switch(method){
      case ApiMethods.GET:
        return this.http.get(endpoint, { headers });
      break;
      case ApiMethods.POST:
        return this.http.post(endpoint, body, { headers })
        
    }
    return this.http.get(endpoint, { headers });
  }

  getHeaders(): HttpHeaders {
    return new HttpHeaders;
  }
}
