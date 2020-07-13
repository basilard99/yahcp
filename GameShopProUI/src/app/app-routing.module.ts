import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';

import { LoginComponent } from './components/login/login.component';

import { FlexLayoutModule } from '@angular/flex-layout';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MaterialModule } from './material.module';


const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'user/:id', loadChildren: () => import('./user/user.module').then(mod => mod.UserModule) }
];

@NgModule({
  declarations: [ LoginComponent ],
  imports: [
    RouterModule.forRoot(routes),
    FlexLayoutModule,
    BrowserAnimationsModule,
    MaterialModule,
    ReactiveFormsModule
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
