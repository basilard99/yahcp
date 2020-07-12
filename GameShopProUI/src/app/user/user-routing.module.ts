import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { BaseUserComponent } from './components/base-user.component';


const routes: Routes = [
  { path: '', component: BaseUserComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }
