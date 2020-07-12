import { Input, Component, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  form: FormGroup = new FormGroup({
    username: new FormControl(''),
    password: new FormControl(''),
  });

  constructor(private router: Router) {}

  submit() {
    if (this.tempValidateUser(this.form.get('username').value, this.form.get('password').value)) {
      this.error = null;
      this.router.navigate(['/user']);
    }
    else {
      this.error = "Wah-wah-wah!!";
    }
  }

  private tempValidateUser(name: string, password: string): boolean {
    return ((name === 'Rico') && (password === 'abc'));
  }

  @Input() error: string | null;
  @Output() submitEM = new EventEmitter();
}