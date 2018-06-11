import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import {environment} from '../environments/environment';
import {People} from './model/people.interface';

@Injectable()
export class AppService {

  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':  'application/json',
      'Access-Control-Allow-Origin' : '*'
    })
  };

  private readonly API_SERVICE_BASE_PATH = environment.urls.api;

  private readonly API_ENDPOINT = '/api/people/';

  constructor(private http: HttpClient) { }

  getPeople(name: string): Observable<People[]> {
    return this.http.get<People[]>(this.API_SERVICE_BASE_PATH + this.API_ENDPOINT + name);
  }

  savePeople(person: object): Observable<People> {
    return this.http.post<People>(this.API_SERVICE_BASE_PATH + this.API_ENDPOINT + 'register', person, this.httpOptions);
  }


}
