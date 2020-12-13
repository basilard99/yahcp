import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FlexLayoutModule } from '@angular/flex-layout';
import { MaterialModule } from '../material.module';

import { CustomerRoutingModule } from './customer-routing.module';
import { CustomerHeaderComponent } from './components/customer-header/customer-header.component';
import { BaseCustomerComponent } from './components/base-customer.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';

@NgModule({
  declarations: [CustomerHeaderComponent, BaseCustomerComponent, DashboardComponent],
  imports: [
    CommonModule,
    CustomerRoutingModule,
    MaterialModule,
    FlexLayoutModule
  ]
})
export class CustomerModule { }
