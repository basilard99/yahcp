import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserRoutingModule } from './user-routing.module';
import { UserHeaderComponent } from './components/user-header/user-header.component';


@NgModule({
  declarations: [UserHeaderComponent],
  imports: [
    CommonModule,
    UserRoutingModule
  ]
})
export class UserModule { }
