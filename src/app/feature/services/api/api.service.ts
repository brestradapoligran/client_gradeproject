import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) { }

  callApi(method: ApiMethods, endpoint: string) {


    switch (method) {
      case ApiMethods.GET:
        this.http.get(endpoint);
        break;
      case ApiMethods.POST:
        break;
      case ApiMethods.PUT:
        break;
      case ApiMethods.DELETE:
        break;
    }
  }
}
