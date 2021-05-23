import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CustomerDetailComponent } from './features/customers/customer-detail/customer-detail.component';
import { CustomerListComponent } from './features/customers/customer-list/customer-list.component';
import { HomeComponent } from './features/home/home.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'clientes', component: CustomerListComponent },
  { path: 'clientes/detalhe', component: CustomerDetailComponent },
  { path: 'clientes/detalhe/:id', component: CustomerDetailComponent },
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
