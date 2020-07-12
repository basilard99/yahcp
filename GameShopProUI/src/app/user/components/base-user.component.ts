import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-base-user',
  template: `
    <user-header></user-header>
    <user-dashboard></user-dashboard>
  `,
  styles: [
  ]
})
export class BaseUserComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
