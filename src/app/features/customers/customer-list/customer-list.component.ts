import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { CustomerService } from 'src/app/services/customer.service';
import { Customer } from './../../../models/customer.model';

@Component({
  selector: 'app-customer-list',
  templateUrl: '../customer-list/customer-list.component.html',
  styleUrls: ['../customer-list/customer-list.component.scss']
})
export class CustomerListComponent implements OnInit {

  customers!: Customer[];
  @ViewChild('search') search!: ElementRef;
  loading = false;

  constructor(
    private _customer: CustomerService,
  ) { }

  ngOnInit(): void {
    this.getCustomers();
  }

  getCustomers() {
    setTimeout(() => this.search.nativeElement.focus(), 100);
    this.loading = true;
    this._customer.getAll()
      .subscribe(
        res => {
          this.customers = res;
          this.loading = false;
        }
      );
  }

  getByBusinessKey() {

  }

  edit(id: number) {

  }

  delete(id: number) {

  }

}
