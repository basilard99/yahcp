import { Injectable } from '@angular/core';
import { CheckIn } from '../interfaces/check-in';
import { Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';

import { environment } from '../,,/../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CheckInService {
  private baseUrl = environment.baseUrl;

  constructor(private http: HttpClient) { }

  public AddCheckIn(storeName: string) {
    /*
    let foundCheckIn = this.temporaryData.find(ci => ci.ShopName === storeName);
    if (foundCheckIn !== undefined) {
      foundCheckIn.NumberOfCheckIns++;
      foundCheckIn.LastCheckIn = new Date();
    }
    */
  }

  GetCheckIns(userId: string) : Observable<CheckIn[]> {
    return this.http.get<CheckIn[]>(this.baseUrl + '/shoppers/ed1bc51e-22c9-452f-b0b0-993b4c7be10e/checkins');
  }
}
