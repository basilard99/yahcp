import { Component, ViewChild, AfterViewInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserHeaderComponent } from './user-header/user-header.component';

@Component({
  selector: 'app-base-user',
  template: `
    <user-header></user-header>
    <user-dashboard></user-dashboard>
  `,
  styles: [
  ]
})
export class BaseUserComponent implements AfterViewInit {

  @ViewChild(UserHeaderComponent)
  private userHeaderComponent: UserHeaderComponent;

  constructor(private activatedRoute: ActivatedRoute) { }

  ngAfterViewInit(): void {
    this.activatedRoute.params.subscribe(
      params => (this.userHeaderComponent.SetUserId(params['id']))
    );    
  }
}
