import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserHeaderComponent } from './user-header.component';
import { UserService } from '../../services/user/user.service';
import { of, Observable } from 'rxjs';

describe('UserHeaderComponent', () => {  
  let component: UserHeaderComponent;
  let userServiceStub: Partial<UserService>;  
  let fixture: ComponentFixture<UserHeaderComponent>;

  let userService: UserService;

  beforeEach(() => {

    userServiceStub = {
      GetUserName(_: string): Observable<string> {
        return of("User, Test");
      }
    }

    TestBed.configureTestingModule({
      declarations: [ UserHeaderComponent ],
      providers: [ { provide: UserService, useValue: userServiceStub } ]
    });

    fixture = TestBed.createComponent(UserHeaderComponent);
    component = fixture.componentInstance;
    userService = TestBed.inject(UserService);
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
