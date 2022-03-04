import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.prod';
import { Endpoints } from '../enums/endpoints';

@Injectable({
  providedIn: 'root',
})
export class VisitService {
  apiUrl = `${environment.BACKEND_URL}${Endpoints.VISITS}`;

  constructor(private _http: HttpClient) {}

  saveVisit() {
    return this._http.post<any[]>(this.apiUrl, {});
  }

  getVisits() {
    return this._http.get<any[]>(this.apiUrl);
  }
}
