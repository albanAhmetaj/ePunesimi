import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { ApiService } from '../api.service'
import { ENDPOINTS } from '../ENDPOINTS';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  base_url = 'http://localhost:3000'
  getPosts_url = this.base_url
  applyToJob_url = `${this.base_url}/posts`
  getApplications_url =  `${this.base_url}/posts`
  getPostByID_url =  `${this.base_url}/posts`
  getMyPosts_url = `${this.base_url}/dashboard`

  constructor(private _http: HttpClient, private apiService: ApiService) {}

  getPosts() {
    return this._http.get<any>(this.getPosts_url).pipe(
      // tap((data) => console.log(JSON.stringify(data))),
      // catchError(this.handleError)
    );
  }

  getPostById(id) {
    return this._http.get<any>(`${this.getPostByID_url}/${id}`).pipe(tap())
  }
  getMyPosts() {
    return this._http.get<any>(`${this.getMyPosts_url}`).pipe(tap())
  }

  applyToJob(id, body) {
    return this._http.post<any>(`${this.applyToJob_url}/${id}`, body).pipe(tap())
  }

  getApplications(id) {
    return this._http.get<any>(`${this.getApplications_url}/${id}`).pipe(tap())
  }

  createJob(body) {
    return this._http.post<any>(`${this.base_url}/create`, body).pipe(tap())
  } 

  updateJob(body, id) {
    return this._http.put<any>(`${this.base_url}/posts/${id}`, body).pipe(tap())
  }

  deleteJob(id) {
    return this._http.delete<any>(`${this.base_url}/posts/${id}`).pipe(tap())
  }

  // Error handler
  private handleError(err) {
    let errorMessage: string;
    if (err.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      errorMessage = `An error occurred: ${err.error.status}`;
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      errorMessage = `Backend returned code ${err.status}: ${err.body.error}`;
    }
    console.error(err);
    return throwError(errorMessage);
  }
}