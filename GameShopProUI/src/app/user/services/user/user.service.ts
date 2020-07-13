import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  constructor() { }  

  public GetUserName(id: string): Observable<string> {
    if (id === '61430f8c-fb73-468e-9064-448598c189d9') {
      return of("Nardini, Rico");
    }
  }
}
