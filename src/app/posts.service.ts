import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Message } from './message'


const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json'
  })
};

@Injectable({
  providedIn: 'root'
})
export class PostsService {
  private baseUrl: string = 'http://172.24.9.148:5000/api/posts'
  private postUrl: string = 'http://172.24.9.148:5000/api/post'

 constructor(private http: HttpClient){ 
 }

 getPosts(): Observable<Message[]>{
   return this.http.get<Message[]>(this.baseUrl)
 }

 newPost(form){
   return this.http.post(this.postUrl, form, httpOptions)
   form.resetForm()
 }
 
}