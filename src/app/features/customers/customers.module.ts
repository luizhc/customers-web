import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { CoreModule } from './../../core/core.module';
import { CustomerDetailComponent } from './customer-detail/customer-detail.component';
import { CustomerListComponent } from './customer-list/customer-list.component';

@NgModule({
  declarations: [CustomerListComponent, CustomerDetailComponent],
  imports: [CommonModule, ReactiveFormsModule, CoreModule, RouterModule],
})
export class CustomersModule {}
