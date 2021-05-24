import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment.prod';
import { Customer } from './../models/customer.model';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  constructor(private _http: HttpClient) { }

  findAll(): Observable<Customer[]> {
    return this._http.get<Customer[]>(environment.BACKEND_URL);
  }

  findById(_id: string): Observable<Customer> {
    return this._http.get<Customer>(environment.BACKEND_URL + _id);
  }

  findByBusinessKey(businessKey: string): Observable<Customer[]> {
    return this._http.get<Customer[]>(`${environment.BACKEND_URL}businessKey/` + businessKey);
  }

  create(customer: Customer): Observable<Customer> {
    return this._http.post<Customer>(environment.BACKEND_URL, customer);
  }

  update(_id: string, customer: Customer): Observable<Customer> {
    return this._http.put<Customer>(environment.BACKEND_URL + _id, customer);
  }

  delete(_id: string) {
    return this._http.delete<Customer>(environment.BACKEND_URL + _id);
  }

}
