import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FlexLayoutModule } from '@angular/flex-layout';
import { MaterialModule } from '../material.module';

import { UserRoutingModule } from './user-routing.module';
import { UserHeaderComponent } from './components/user-header/user-header.component';
import { BaseUserComponent } from './components/base-user.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';

@NgModule({
  declarations: [UserHeaderComponent, BaseUserComponent, DashboardComponent],
  imports: [
    CommonModule,
    UserRoutingModule,
    MaterialModule,
    FlexLayoutModule
  ]
})
export class UserModule { }
