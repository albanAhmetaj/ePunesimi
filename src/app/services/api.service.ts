import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import {environment} from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  public apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) {
  }

  public get(url): Observable<any> {
    return this.http.get(`${this.apiUrl}${url}`);
  }

  public post(url, model): Observable<any> {
    return this.http.post(`${this.apiUrl}${url}`, model);
  }

  public put(url, model): Observable<any> {
    return this.http.put(`${this.apiUrl}${url}`, model);
  }

  public remove(url, options?): Observable<any> {
    return this.http.delete(`${this.apiUrl}${url}`, options);
  }
}