import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Posts } from './Posts';
import { POSTS } from '../blog/blog-summary';
import { HttpClient } from '@angular/common/http';


@Component({
  selector: 'app-posts',
  template: `<div [innerHTML]="post"></div>`,
  styleUrls: ['./posts.component.css']
})

export class BlogPostComponent implements OnInit {
  post: any;
  postName: string;
  Posts = POSTS;
  selectedPost: Posts;

  constructor( 
    private route: ActivatedRoute,
    private http: HttpClient
  ) {}



  ngOnInit()  {
    var postName: string = this.route.snapshot.params["urltitle"];
    console.log("this is postName value = "+ postName);
   
    const options = {responseType: 'text' as 'text'};

    this.http.get("assets/posts/".concat(postName, ".html"), options).subscribe(data => {
      this.post = data;
      console.log(data);
    })  
    
  }
}
