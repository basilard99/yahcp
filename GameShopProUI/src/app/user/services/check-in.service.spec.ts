import { TestBed } from '@angular/core/testing';

import { CheckIn } from '../interfaces/check-in';
import { CheckInService } from './check-in.service';
import { TestScheduler } from 'rxjs/testing';

const testScheduler = new TestScheduler((actual, expected) => {
  expect(actual).toEqual(expected);
});

const testSchedulerWithoutDates = new TestScheduler((actual, expected) => {
  console.log(actual);
})

describe('CheckInService', () => {
  let service: CheckInService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CheckInService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return an Observable when GetCheckIns is called', () => {
    testScheduler.run(helpers => {
      const { expectObservable } = helpers;
      const values = {
        a: [
            { ShopName: 'Dark Legion Games', NumberOfCheckIns: 2, LastCheckIn: new Date('2020-08-01T15:00:00') },
            { ShopName: 'Pyramid Gaming', NumberOfCheckIns: 5, LastCheckIn: new Date('2020-08-08T17:30:00') }
        ]
      };

      expectObservable(service.GetCheckIns('TEMP')).toBe('(a|)', values);
    });
  });

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
  })
});
