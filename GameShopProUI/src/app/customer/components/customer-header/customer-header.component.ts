import { Component } from '@angular/core';
import { Observable } from 'rxjs';

import { ICustomer } from '../../interfaces/customer';
import { CustomerService } from '../../services/customer/customer.service';

@Component({
  selector: 'customer-header',
  templateUrl: './customer-header.component.html',
  styleUrls: ['./customer-header.component.scss']
})
export class CustomerHeaderComponent {

  // Public fields
  public Customer: Observable<ICustomer>;

  constructor(private customerService: CustomerService) {}

  public SetUserId(id: string) {
    this.Customer = this.customerService.GetCustomer(id);
  }
}
