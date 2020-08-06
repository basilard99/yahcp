import { Component } from '@angular/core';
import { Subject } from 'rxjs';

import { UserService } from '../../services/user/user.service';

@Component({
  selector: 'user-header',
  templateUrl: './user-header.component.html',
  styleUrls: ['./user-header.component.scss']
})
export class UserHeaderComponent {

  // Public fields
  public UserName$: Subject<string> = new Subject<string>();

  constructor(private userService: UserService) {}

  public SetUserId(id: string) {
    this.userService.GetUserName(id).subscribe(s => {
      this.UserName$.next(s);
    });
  }
}
