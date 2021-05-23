import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Customer } from './../models/customer.model';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  uri = "localhost:8080";

  constructor(
    private _http: HttpClient
  ) { }

  getAll(): Observable<Customer[]> {
    return this._http.get<Customer[]>("assets/json/customers.json");
  }

  getById(id: number) {
    // return this._http.get(this.uri, id);
  }

  getByBusinessKey(businessKey: number) {
    // return this._http.get(this.uri, businessKey);
  }

  create(customer: Customer) {
    return this._http.post(this.uri, customer);
  }

  update(id: number, customer: Customer) {
    // return this._http.put(this.uri, customer);
  }

  delete(id: number) {
    // return this._http.delete(this.uri, id);
  }

}
