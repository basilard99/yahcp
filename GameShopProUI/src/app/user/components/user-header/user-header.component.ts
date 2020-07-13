import { Component } from '@angular/core';
import { Observable } from 'rxjs';

import { UserService } from '../../services/user/user.service';

@Component({
  selector: 'user-header',
  templateUrl: './user-header.component.html',
  styleUrls: ['./user-header.component.scss']
})
export class UserHeaderComponent {

  // Private fields
  private userId : string;

  // Public fields
  public UserName$: Observable<string>;

  constructor(private userService: UserService) { }

  public SetUserId(id: string) {
    this.userId = id;
    this.UserName$ = this.userService.GetUserName(this.userId);
  }
}
