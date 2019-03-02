import { Component, OnInit, ViewChild } from "@angular/core";
import { Message } from "./message";
import { PostsService } from "./posts.service";
import { environment } from '../../environments/environment.prod';
import { Observable } from "rxjs"
import * as io from 'socket.io-client';

export interface Post {
  title: string;
  text: string;
}

@Component({
  selector: 'app-messaging',
  templateUrl: './messaging.component.html',
  styleUrls: ['./messaging.component.scss']
})
export class MessagingComponent implements OnInit {
  private url = environment.api_server

  private socket; 

  public interval: any;

  @ViewChild("f")
  formValues; // Added this

  public message: Message = <Message>{};

  public messages = [];

  constructor(private postsService: PostsService) {
  }

ngOnInit() {
  this.refreshData()
  this.socket = io(this.url);
  this.socket.on('my event', (message) => { this.messages = message; });
  console.log(this.message)
  //this.interval = setInterval(() => {
  //  this.refreshData();
  //}, 2000);
}

onSubmit(post: Post) {
  this.postsService.newPost(post).subscribe(data => {});
  this.formValues.resetForm();
}

refreshData() {
  this.postsService.getPosts().subscribe(data => {
    this.messages = data;
  });
}
}