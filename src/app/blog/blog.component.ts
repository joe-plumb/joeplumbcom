import { Component, OnInit } from '@angular/core';
import { Posts } from '../posts/Posts';
import { POSTS } from './blog-summary';

@Component({
  selector: 'blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.css'],
            
})
export class BlogComponent implements OnInit {

  Posts = POSTS;

  selectedPost: Posts;
  onSelect(post: Posts): void {
    this.selectedPost = post;
  }
 
  constructor() { 
  }

  ngOnInit(): void {
  }
  
}
