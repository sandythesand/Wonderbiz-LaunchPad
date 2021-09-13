import { environment } from './../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CommonService {

  constructor(
    private http: HttpClient
  ) { }

  getUcLaunch() {
    return this.http.get(`${environment.apiUrl}/launches/upcoming`).pipe(map((res) => {
      return res;
    }));
  }
  getPastLaunch() {
    return this.http.get(`${environment.apiUrl}/launches/past`).pipe(map((res) => {
      return res;
    }));
  }
  getTotalLaunch() {
    return this.http.get(`${environment.apiUrl}/launches`).pipe(map((res) => {
      return res;
    }));
  }
}
