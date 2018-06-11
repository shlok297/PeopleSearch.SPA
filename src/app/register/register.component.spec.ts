import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterComponent } from './register.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {AppService} from '../app.service';
import {AppServiceStub} from '../../../test/app.service.stub';
import {Observable} from 'rxjs/Observable';
import {People} from '../model/people.interface';

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


describe('RegisterComponent', () => {
  let component: RegisterComponent;
  let fixture: ComponentFixture<RegisterComponent>;

  let appServiceStub: AppServiceStub;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RegisterComponent ],
      imports: [FormsModule, ReactiveFormsModule],
      providers: [
        { provide: AppService, useClass: AppServiceStub }
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegisterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    appServiceStub = fixture.debugElement.injector.get(AppService);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have empty fields on load', () => {
    Object.keys(component.registerFormGroup.controls).forEach(key => {
      component.registerFormGroup.get(key).markAsTouched();
      expect(component.registerFormGroup.get(key).value).toBe('');
    });
    expect(component.registerFormGroup.valid).toBe(false);
  });

  it('should mark the form invalid when formControls are touched', () => {
    Object.keys(component.registerFormGroup.controls).forEach(key => {
      component.registerFormGroup.get(key).markAsTouched();
    });
    expect(component.registerFormGroup.valid).toBe(false);
  });

  it('should mark form valid if input has required value', () => {
    component.registerFormGroup.controls['firstName'].setValue('Alex');
    component.registerFormGroup.controls['lastName'].setValue('Sandro');
    component.registerFormGroup.controls['age'].setValue(24);
    component.registerFormGroup.controls['address'].setValue('930 E 300 S');
    component.registerFormGroup.controls['city'].setValue('Salt Lake City');
    component.registerFormGroup.controls['state'].setValue('UT');
    component.registerFormGroup.controls['zip'].setValue(84102);
    component.registerFormGroup.controls['country'].setValue('USA');
    component.registerFormGroup.controls['interests'].setValue('Playing football, Music');
    Object.keys(component.registerFormGroup.controls).forEach(key => {
      expect(component.registerFormGroup.get(key).valid).toBe(true);
    });
    expect(component.registerFormGroup.valid).toBe(true);
  });

  it('register() should not call savePerson() if form invalid', () => {

    const appService = fixture.debugElement.injector.get(AppService);
    spyOn(appService, 'savePeople');
    component.register();
    expect(appService.savePeople).not.toHaveBeenCalled();
  });

  it('register() should call savePerson() if form valid', () => {

    const spy = spyOn(appServiceStub, 'savePeople').and.returnValue(
      Observable.of(person[0])
    );
    component.registerFormGroup.controls['firstName'].setValue('Alex');
    component.registerFormGroup.controls['lastName'].setValue('Sandro');
    component.registerFormGroup.controls['age'].setValue(24);
    component.registerFormGroup.controls['address'].setValue('930 E 300 S');
    component.registerFormGroup.controls['city'].setValue('Salt Lake City');
    component.registerFormGroup.controls['state'].setValue('UT');
    component.registerFormGroup.controls['zip'].setValue(84102);
    component.registerFormGroup.controls['country'].setValue('USA');
    component.registerFormGroup.controls['interests'].setValue('Playing football, Music');
    component.register();
    expect(spy.calls.any()).toBe(true);
  });


  it('createModelObj() should set the person object', () => {
    component.registerFormGroup.controls['firstName'].setValue('Alex');
    component.registerFormGroup.controls['lastName'].setValue('Sandro');
    component.registerFormGroup.controls['age'].setValue(24);
    component.registerFormGroup.controls['address'].setValue('930 E 300 S');
    component.registerFormGroup.controls['city'].setValue('Salt Lake City');
    component.registerFormGroup.controls['state'].setValue('UT');
    component.registerFormGroup.controls['zip'].setValue(84102);
    component.registerFormGroup.controls['country'].setValue('USA');
    component.registerFormGroup.controls['interests'].setValue('Playing football, Music');

    component.createModelObj();

    expect(component.person.firstName).toBe(component.registerFormGroup.get('firstName').value);
    expect(component.person.lastName).toBe(component.registerFormGroup.get('lastName').value);
    expect(component.person.age).toBe(component.registerFormGroup.get('age').value);
    expect(component.person.address).toBe(component.registerFormGroup.get('address').value);
    expect(component.person.city).toBe(component.registerFormGroup.get('city').value);
    expect(component.person.state).toBe(component.registerFormGroup.get('state').value);
    expect(component.person.zip).toBe(component.registerFormGroup.get('zip').value);
    expect(component.person.country).toBe(component.registerFormGroup.get('country').value);
    expect(component.person.interests).toBe(component.registerFormGroup.get('interests').value);

  });

  it('updateState() should refresh the state list object', () => {
    const event = {
      target: {
        value: 'CAN'
      }
    };

    component.updateState(event);
    expect(component.states.length).toBe(2);
    expect(component.states.indexOf('BC')).not.toBe(-1);
  });

});
