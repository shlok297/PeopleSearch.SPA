import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchComponent } from './search.component';
import {AppServiceStub} from '../../../test/app.service.stub';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {AppService} from '../app.service';
import {People} from '../model/people.interface';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/observable/of';

const person: People[] = [
  {
    firstName: 'Alex',
    lastName: 'sandro',
    age: 24,
    address: 'SLC',
    state: 'UT',
    city: 'SLC',
    country: 'USA',
    zip: '84102'
  },
  {
    firstName: 'Alexis',
    lastName: 'Sanches',
    age: 24,
    address: 'SLC',
    state: 'UT',
    city: 'SLC',
    country: 'USA',
    zip: '84102'
  }
  ];


describe('SearchComponent', () => {
  let component: SearchComponent;
  let fixture: ComponentFixture<SearchComponent>;

  let appServiceStub: AppServiceStub;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SearchComponent ],
      imports: [FormsModule, ReactiveFormsModule],
      providers: [
        { provide: AppService, useClass: AppServiceStub}
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    appServiceStub = fixture.debugElement.injector.get(AppService);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have empty fields on load', () => {
    Object.keys(component.searchFormGroup.controls).forEach((key) => {
      expect(component.searchFormGroup.get(key).value).toBe('');
    });
  });

  it('should be marked invalid if touched', () => {
    component.searchFormGroup.controls['name'].markAsTouched();
    expect(component.searchFormGroup.controls['name'].valid).toBe(false);
  });

  it('should be marked invalid if entered invalid value', () => {
    component.searchFormGroup.controls['name'].setValue('!@Name');
    expect(component.searchFormGroup.controls['name'].valid).toBe(false);
  });

  it('search() should not be called if form invalid', () => {
    const appService = fixture.debugElement.injector.get(AppService);
    spyOn(appService, 'getPeople');
    component.search();
    expect(appService.getPeople).not.toHaveBeenCalled();
  });

  it('hideResult() should set the showResult flag to false', () => {
    component.hideResult();
    expect(component.showResult).toBe(false);
  });

  it('search() should be called if form valid', () => {
    const spy = spyOn(appServiceStub, 'getPeople').and.returnValue(
      Observable.of(person)
    );
    component.searchFormGroup.controls['name'].setValue('alex');
    component.search();
    expect(spy.calls.any()).toBe(true);
  });
});
