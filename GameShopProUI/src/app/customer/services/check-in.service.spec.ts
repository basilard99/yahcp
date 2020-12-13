import { HttpClient } from '@angular/common/http';
import { cold } from 'jasmine-marbles';

import { CheckInService } from './check-in.service';
import { environment } from '../,,/../../../environments/environment';

describe('CheckInService', () => {
  let service: CheckInService;
  let httpSpy: jasmine.SpyObj<HttpClient>;
  let baseUrl = environment.baseUrl;

  beforeEach(() => {
    httpSpy = jasmine.createSpyObj('HttpClient', ['get']);
    service = new CheckInService(httpSpy);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return an Observable when GetCheckIns is called', () => {
    const responseData = [
      { ShopName: 'Dark Legion Games', NumberOfCheckIns: 2, LastCheckIn: new Date('2020-08-01T15:00:00') },
      { ShopName: 'Pyramid Gaming', NumberOfCheckIns: 5, LastCheckIn: new Date('2020-08-08T17:30:00') }
    ];

    httpSpy.get.and.returnValue(cold('--(a|)', { a: responseData }));

    const output = service.GetCheckIns('ed1bc51e-22c9-452f-b0b0-993b4c7be10e');

    expect(output).toBeObservable(cold('--(a|)', { a: responseData }));
    expect(httpSpy.get).toHaveBeenCalledWith(baseUrl + '/shoppers/ed1bc51e-22c9-452f-b0b0-993b4c7be10e/checkins');
  });
/*
  it('should update the CheckIn observable AddCheckIn is called with valid name', () => {
    testSchedulerWithoutDates.run(helpers => {
      const { expectObservable } = helpers;
      const values = {
        a: [
            { ShopName: 'Dark Legion Games', NumberOfCheckIns: 2, LastCheckIn: new Date('2020-08-01T15:00:00') },
            { ShopName: 'Pyramid Gaming', NumberOfCheckIns: 5, LastCheckIn: new Date('2020-08-08T17:30:00') }
        ]
      };

      let checkIns: CheckIn[];

      service.GetCheckIns('TEMP').subscribe(s => checkIns = s);
      service.AddCheckIn('Dark Legion Games');
      expect(checkIns.find(p => p.ShopName === 'Dark Legion Games').NumberOfCheckIns).toBe(3);
    });
  })*/
});
