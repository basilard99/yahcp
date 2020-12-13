import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

import { CheckIn } from '../../interfaces/check-in';
import { CheckInService } from '../../services/check-in.service';

@Component({
  selector: 'customer-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  // Public Fields
  public CheckIns$: Observable<CheckIn[]> = new Observable<CheckIn[]>();

  constructor(private checkInService: CheckInService) {};

  public onCheckInClicked(storeName: string) {
    this.checkInService.AddCheckIn(storeName);
  }

  ngOnInit(): void {
   this.CheckIns$ = this.checkInService.GetCheckIns('ed1bc51e-22c9-452f-b0b0-993b4c7be10e');
  }
}
