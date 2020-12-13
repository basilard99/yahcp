import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

import { ICustomer } from '../../interfaces/customer';
import { CheckIn } from '../../interfaces/check-in';

class CustomerCacheEntry {
  constructor(customer: ICustomer) {
    this.LastCheckedDateTime = new Date();
    this.CustomerData = customer;
  };

  LastCheckedDateTime: Date;
  CustomerData: ICustomer;
  
  isNotWithinTimeFrame(): Boolean {
    return this.LastCheckedDateTime.getSeconds() + 5 > new Date().getSeconds()
  };

};

@Injectable({
  providedIn: 'root'
})
export class CustomerService {
  
  private customerCache = new Map<string, CustomerCacheEntry>();
  private emptyCustomer: ICustomer = {
    CustomerId: '00000000-0000-0000-0000-000000000000',
    DisplayName: 'Invalid User',
    Email: '',
    CheckIns: new Array<CheckIn>()
  }
  constructor() { }  

  public GetCustomer(id: string): Observable<ICustomer> {
    let cacheEntry = this.customerCache.get(id);

    if (cacheEntry === undefined || cacheEntry.isNotWithinTimeFrame()) {
      this.getCustomerFromApi()
        .subscribe(
          v => {
            this.customerCache.set(v.CustomerId, new CustomerCacheEntry(v));
            return of(v);
          },
          err => {
            return of(this.emptyCustomer);
          }
        )
    }

    return of(cacheEntry.CustomerData);
  }

  private getCustomerFromApi(): Observable<ICustomer> {
    return of(this.emptyCustomer);
  }
}
