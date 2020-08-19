import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

import { CheckIn } from '../../interfaces/check-in';
import { CheckInService } from '../../services/check-in.service';

@Component({
  selector: 'user-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  // Public Fields
  public CheckIns$: Observable<CheckIn[]> = new Observable<CheckIn[]>();

  constructor(private checkInService: CheckInService) {};

  ngOnInit(): void {
   this.CheckIns$ = this.checkInService.GetCheckIns('TEMP');
  }
}
