import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment.prod';
import { Endpoints } from '../enums/endpoints';
import { Customer } from './../models/customer.model';

@Injectable({
  providedIn: 'root',
})
export class CustomerService {
  apiUrl = `${environment.BACKEND_URL}${Endpoints.CUSTOMERS}`;

  constructor(private _http: HttpClient) {}

  findAll(): Observable<Customer[]> {
    return this._http.get<Customer[]>(this.apiUrl);
  }

  findById(_id: string): Observable<Customer> {
    return this._http.get<Customer>(`${this.apiUrl}/${_id}`);
  }

  findByBusinessKey(businessKey: string): Observable<Customer[]> {
    return this._http.get<Customer[]>(
      `${this.apiUrl}/businessKey/${businessKey}`
    );
  }

  create(customer: Customer): Observable<Customer> {
    return this._http.post<Customer>(this.apiUrl, customer);
  }

  update(_id: string, customer: Customer): Observable<Customer> {
    return this._http.put<Customer>(`${this.apiUrl}/${_id}`, customer);
  }

  delete(_id: string) {
    return this._http.delete<Customer>(`${this.apiUrl}/${_id}`);
  }
}
