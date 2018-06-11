import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import { ViewChild } from '@angular/core';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import {AppService} from '../app.service';
import {CountryMapping} from '../country.mapping';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {People} from '../model/people.interface';

declare var alertify: any;

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})

export class RegisterComponent implements OnInit {

  private alphaRegex = '^[A-Za-z]+$';
  private alphaWithSpaceRegex = '[a-zA-Z][a-zA-Z ]+';
  private alphaNumericWithSpace = '^[A-Za-z0-9- ]+$';
  private numberRegex = '^[0-9]*$';
  private alphanumericRegex = '^[a-zA-Z0-9_]*$';
  private imageReaderResult: string;

  @Output() spinnerActive = new EventEmitter<boolean>();

  registerFormGroup: FormGroup;
  countryMapping = new CountryMapping().mapping;
  person: People;
  states: string[] = [];
  countries: string[] = [];
  isAnyFieldInvalid = false;
  showSuccess = false;
  showError = false;
  showImageSize = false;
  showNotImage = false;
  @ViewChild('fileInput')
  myInputVariable: any;


  constructor(private appService: AppService,
              private fb: FormBuilder) {
  }

  ngOnInit() {

    this.registerFormGroup =  this.fb.group({
      firstName: ['', [Validators.required, Validators.pattern(this.alphaWithSpaceRegex), Validators.maxLength(30)]],
      lastName: ['', [Validators.required, Validators.pattern(this.alphaWithSpaceRegex), Validators.maxLength(30)]],
      age: ['', [Validators.required, Validators.pattern(this.numberRegex),  Validators.min(1), Validators.max(150)]],
      address: ['', [Validators.required, Validators.pattern(this.alphaNumericWithSpace), Validators.maxLength(75)]],
      city: ['', [Validators.required, Validators.pattern(this.alphaWithSpaceRegex)]],
      state: ['', [Validators.required]],
      zip: ['', [Validators.required, Validators.pattern(this.alphanumericRegex), Validators.maxLength(15)]],
      country: ['', [Validators.required]],
      interests: ['']
    });

    this.countryMapping.forEach((mapping) => {

      if (this.states.indexOf(mapping.state) < 0) {
        this.states.push(mapping.state);
      }
      if (this.countries.indexOf(mapping.country) < 0) {
        this.countries.push(mapping.country);
      }
    });
  }

  onFileSelected(event) {
    this.showImageSize = false;
    this.showNotImage = false;
    const file: File = event.target.files[0];
    if (file.name.match(/\.(jpg|jpeg|png)$/)) {
      if (file.size > 1048576) {
        this.showImageSize = true;
        this.reset();
      } else {
        const myReader: FileReader = new FileReader();
        myReader.onloadend = (e) => {
          this.imageReaderResult = myReader.result;
        };
        myReader.readAsDataURL(file);
      }
    } else {
      this.showNotImage = true;
      this.reset();
    }
  }

  register() {
    this.showError = false;
    this.showSuccess = false;
    if (this.registerFormGroup.valid) {
      this.spinnerActive.emit(true);
      this.createModelObj();
      this.appService.savePeople(this.person)
        .subscribe(() => {
          setTimeout (() => {
            this.spinnerActive.emit(false);
            this.registerFormGroup.reset();
            this.reset();
            this.showSuccess = true;
          }, 3000);
        }, error => {
          this.showError = true;
          this.spinnerActive.emit(false);
        });
    } else {
      this.isAnyFieldInvalid = true;
    }
  }

  updateState($event) {
    const stateList: string[] = [];
    this.countryMapping.forEach((mapping) => {
      if (mapping.country === $event.target.value) {
        if (stateList.indexOf(mapping.state) < 0) {
          stateList.push(mapping.state);
        }
      }
    });
    if (stateList.length !== 0) {
      this.states = stateList;
    }
  }

  createModelObj() {

    const p: People = {
      firstName: this.registerFormGroup.get('firstName').value,
      lastName: this.registerFormGroup.get('lastName').value,
      age:  this.registerFormGroup.get('age').value,
      address: this.registerFormGroup.get('address').value,
      zip: this.registerFormGroup.get('zip').value,
      city: this.registerFormGroup.get('city').value,
      state:  this.registerFormGroup.get('state').value,
      country: this.registerFormGroup.get('country').value,
      interests: this.registerFormGroup.get('interests').value,
      image: this.imageReaderResult
    }

    this.person = p;
  }

  reset() {
    this.myInputVariable.nativeElement.value = '';
  }
}
