import { Injectable } from '@angular/core';
import { CheckIn } from '../interfaces/check-in';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CheckInService {
  temporaryData: CheckIn[] = [
    { ShopName: 'Dark Legion Games', NumberOfCheckIns: 2, LastCheckIn: new Date('2020-08-01T15:00:00') },    
    { ShopName: 'Pyramid Gaming', NumberOfCheckIns: 5, LastCheckIn: new Date('2020-08-08T17:30:00') }
  ];

  constructor() { }

  GetCheckIns(userId: string) : Observable<CheckIn[]> {
    return of(this.temporaryData);
  }
}
