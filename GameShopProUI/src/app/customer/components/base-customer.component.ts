import { Component, ViewChild, AfterViewInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CustomerHeaderComponent } from './customer-header/customer-header.component';

@Component({
  selector: 'app-base-customer',
  template: `
    <customer-header></customer-header>
    <customer-dashboard></customer-dashboard>
  `,
  styles: [
  ]
})
export class BaseCustomerComponent implements AfterViewInit {

  @ViewChild(CustomerHeaderComponent)
  private customerHeaderComponent: CustomerHeaderComponent;

  constructor(private activatedRoute: ActivatedRoute) { }

  ngAfterViewInit(): void {
    this.activatedRoute.params.subscribe(
      params => (this.customerHeaderComponent.SetUserId(params['id']))
    );    
  }
}
