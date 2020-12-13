import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { BaseCustomerComponent } from './components/base-customer.component';


const routes: Routes = [
  { path: '', component: BaseCustomerComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CustomerRoutingModule { }
