import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {People} from '../model/people.interface';
import {AppService} from '../app.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})

export class SearchComponent implements OnInit {

  private searchNameRegex = '^[a-zA-Z0-9_]*$';
  @Output() spinnerActive = new EventEmitter<boolean>();
  searchFormGroup: FormGroup;
  person: People[];

  searchName: string;
  showResult = false;
  showError = false;

  ngOnInit() {

    this.searchFormGroup = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(1), Validators.maxLength(30),
        Validators.pattern(this.searchNameRegex)]]
    });
  }

  constructor(private appService: AppService,
              private fb: FormBuilder) {
  }

  search() {
    if (this.searchFormGroup.valid) {
      this.spinnerActive.emit(true);
      let name = this.searchFormGroup.get('name').value;
      name = name.replace(/\s/g, '');
      this.searchName = name;

      this.appService.getPeople(name).subscribe(person => {
        this.person = person;
        setTimeout (() => {
          this.spinnerActive.emit(false);
          this.showResult = true;
        }, 3000);
      }, error => {
        this.spinnerActive.emit(false);
        this.showError = true;
        setTimeout (() => {
          this.showError = false;
        }, 3000);
      });
    }
  }

  hideResult() {
    this.showResult = false;
  }
}
