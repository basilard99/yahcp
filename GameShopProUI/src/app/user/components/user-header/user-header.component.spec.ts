import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserHeaderComponent } from './user-header.component';
import { UserService } from '../../services/user/user.service';
import { of, Observable } from 'rxjs';
import { stringify } from 'querystring';
import { assert } from 'console';
import { doesNotReject } from 'assert';
import { CombineLatestOperator } from 'rxjs/internal/observable/combineLatest';

describe('UserHeaderComponent', () => {  
  let component: UserHeaderComponent;
  let userServiceStub: Partial<UserService>;
  let fixture: ComponentFixture<UserHeaderComponent>;

  let testUserName: string = "User, Test";
    
  const userService = jasmine.createSpyObj('UserService', ['GetUserName']);
  let getUserNameSpy = userService.GetUserName.and.returnValue(of(testUserName));

  beforeEach(() => {

    userServiceStub = {
      GetUserName(_: string): Observable<string> {
        console.debug('asd');
        return of("User, Test");
      }
    }

    TestBed.configureTestingModule({
      declarations: [ UserHeaderComponent ],
      providers: [ 
        { provide: UserService, userServiceStub }
      ]
    });

    fixture = TestBed.createComponent(UserHeaderComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
/*
  it('should pass userId to service', done => {
    component.UserName$.subscribe(v => console.log(`Value = $(v)`));
    component.SetUserId('1');
    done();
  })
  */
});
