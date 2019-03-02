import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map, catchError, tap } from 'rxjs/operators';

const endpoint = 'http://'+window.location.host+'/api'
const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json'
  })
}

export interface Token {
  cspapitoken: string;
}

@Injectable({
  providedIn: 'root'
})
export class RestService {

  constructor(private http: HttpClient) { }

  newCall(form){
    return this.http.post(endpoint, form, httpOptions)
  }

}
