import {Component, Input} from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Welcome to People Search App';
  spinnerFlag = false;

  setSpinnerFlag(flag: boolean) {
    this.spinnerFlag = flag;
  }
}
