import { TestBed } from '@angular/core/testing';
import { TestScheduler } from 'rxjs/testing';

import { CustomerService } from './customer.service';

const testScheduler = new TestScheduler((actual, expected) => {
  expect(actual).toEqual(expected);
});

describe('UserService', () => {
  let service: CustomerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CustomerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('GetUserName returns an observable', () => {
    testScheduler.run(helpers => {
      const { expectObservable } = helpers;
      const values = { 
        a: 'Nardini, Rico', 
        b: 'Invalid User'
      };

      expectObservable(service.GetUserName('61430f8c-fb73-468e-9064-448598c189d9')).toBe('(a|)', values);
      expectObservable(service.GetUserName('noMatch')).toBe('(b|)', values);
    })
  })
});
