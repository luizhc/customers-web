import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { CustomerService } from '../../../services/customer.service';
import { MessageService } from '../../../services/message.service';
import { Customer } from './../../../models/customer.model';

@Component({
  selector: 'app-customer-list',
  templateUrl: './customer-list.component.html',
  styleUrls: ['./customer-list.component.scss'],
})
export class CustomerListComponent implements OnInit {
  customers!: Customer[];
  @ViewChild('search') search!: ElementRef;
  loading = false;

  constructor(
    private _customer: CustomerService,
    private _message: MessageService
  ) {}

  ngOnInit(): void {
    this.getCustomers();
  }

  getCustomers() {
    this.customers = [];
    this.loading = true;
    setTimeout(() => {
      this.search.nativeElement.value = '';
      this.search.nativeElement.focus();
    }, 100);
    this._customer.findAll().subscribe(
      (res) => {
        this.customers = res;
        this.loading = false;
      },
      () => {
        this.loading = false;
        this._message.alertWithIcon(
          'Atenção!',
          'Houve um problema na requisição, tente novamente!',
          'error'
        );
      }
    );
  }

  getByBusinessKey() {
    this.customers = [];
    this.loading = true;
    setTimeout(() => this.search.nativeElement.focus(), 100);
    this._customer.findByBusinessKey(this.search.nativeElement.value).subscribe(
      (res) => {
        this.customers = res;
        this.loading = false;
      },
      () => {
        this.loading = false;
        this._message.alertWithIcon(
          'Atenção!',
          'Houve um problema na requisição, tente novamente!',
          'error'
        );
      }
    );
  }

  delete(customer: Customer) {
    this._message
      .confirmBox(customer.name, `Cliente <strong>${customer.name}</strong>`)
      .then((res) =>
        res
          ? this._customer
              .delete(customer._id)
              .subscribe(() => this.getCustomers())
          : null
      );
  }
}
