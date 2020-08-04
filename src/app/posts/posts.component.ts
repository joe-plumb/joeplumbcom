import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Posts } from './Posts';
import { POSTS } from '../blog/blog-summary';
import { HttpClient } from '@angular/common/http';
import { MarkdownModule } from 'ngx-markdown';


@Component({
  selector: 'app-posts',
  template: `<section>
              <div class="container">
                <div class="row">
                    <div class="col-lg-12">
                        <section><markdown [src]="'/assets/posts/'+postName+'/post.md'"></markdown>
                    </section>
            </div>
        </div>
    </div>
</section>`,
  styleUrls: ['./posts.component.css']
})

export class BlogPostComponent implements OnInit {
  post: any;
  /*postName: string;*/
  Posts = POSTS;
  selectedPost: Posts;
  get postName() { return this.route.snapshot.params["urltitle"]; }
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
