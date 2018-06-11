import {Observable} from 'rxjs/Observable';
import {People} from '../src/app/model/people.interface';
import {of} from 'rxjs/observable/of';

export class AppServiceStub {

  private static PEOPLE: People [] = [
    {
      firstName: 'Alex',
      lastName: 'Robinson',
      age: 25,
      city: 'Salt Lake City',
      address: '425 South',
      state: 'UT',
      country: 'USA',
      zip: '84102'
    },
    {
      firstName: 'Chris',
      lastName: 'West',
      age: 35,
      city: 'Salt Lake City',
      address: '425 North',
      state: 'UT',
      country: 'USA',
      zip: '84165'
    }
    ];

  getPeople(name: string): Observable<People[]> {
    return of(AppServiceStub.PEOPLE);
  }

  savePeople(person: People): Observable<People> {
    return of(AppServiceStub.PEOPLE[0]);
  }

}
