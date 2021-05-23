import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { CustomerService } from '../../../services/customer.service';
import { MessageService } from '../../../services/message.service';
import { Customer } from './../../../models/customer.model';

@Component({
  selector: 'app-customer-list',
  templateUrl: './customer-list.component.html',
  styleUrls: ['./customer-list.component.scss']
})
export class CustomerListComponent implements OnInit {

  customers!: Customer[];
  @ViewChild('search') search!: ElementRef;
  loading = false;

  constructor(
    private _customer: CustomerService,
    private _message: MessageService
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

  delete(customer: Customer) {
    this._message.confirmBox(customer.name, `Cliente <b>${customer.name}</b>`)
      .then(res => res ? this._customer.delete(customer.id) : null);
  }

}
