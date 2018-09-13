import { Component, OnInit, ViewChild } from "@angular/core";
import { Message } from "./message";
import { PostsService } from "./posts.service";

export interface Post {
  title: string;
  text: string;
}
@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"]
})
export class AppComponent {
  public interval: any;

  @ViewChild("f")
  formValues; // Added this

  public message: Message = <Message>{};

  public messages = [];

  constructor(private postsService: PostsService) {}

  ngOnInit() {
    this.refreshData();
    this.interval = setInterval(() => {
      this.refreshData();
    }, 2000);
  }

  onSubmit(post: Post) {
    this.postsService.newPost(post).subscribe(data => {});
    this.formValues.resetForm();
  }

  refreshData() {
    console.log("Polling...");
    this.postsService.getPosts().subscribe(data => {
      this.messages = data;
    });
  }
}
