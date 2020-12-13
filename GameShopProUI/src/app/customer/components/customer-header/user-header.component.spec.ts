import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerHeaderComponent } from './customer-header.component';
import { CustomerService } from '../../services/customer/customer.service';
import { of, Observable } from 'rxjs';

describe('UserHeaderComponent', () => {  
  let component: CustomerHeaderComponent;
  let userServiceStub: Partial<CustomerService>;  
  let fixture: ComponentFixture<CustomerHeaderComponent>;

  let userService: CustomerService;

  beforeEach(() => {

    userServiceStub = {
      GetUserName(_: string): Observable<string> {
        return of("User, Test");
      }
    }

    TestBed.configureTestingModule({
      declarations: [ CustomerHeaderComponent ],
      providers: [ { provide: CustomerService, useValue: userServiceStub } ]
    });

    fixture = TestBed.createComponent(CustomerHeaderComponent);
    component = fixture.componentInstance;
    userService = TestBed.inject(CustomerService);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should pass userId to service', done => {
    spyOn(userServiceStub, 'GetUserName').and.callThrough();
    component.SetUserId('99');
    expect(userServiceStub.GetUserName).toHaveBeenCalledWith('99');
    done();    
  });  
});
