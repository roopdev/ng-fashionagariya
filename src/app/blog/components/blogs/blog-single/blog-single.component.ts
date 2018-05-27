import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';

import { BlogService } from '../../../../shared/services/blog.service';
import { Blog } from '../../../../shared/models/blog.model';

@Component({
  selector: 'app-blog-single',
  templateUrl: './blog-single.component.html',
  styleUrls: ['./blog-single.component.css']
})
export class BlogSingleComponent implements OnInit {
	blog$ = {};
	blogId;

  constructor(private blogService: BlogService, 
              private routeActivated: ActivatedRoute,
              private route: Router) { }

  ngOnInit() {
  	this.routeActivated.params.subscribe(params => {
  	      this.blogId = params['id'];
  	    });
  	this.blogService.getBlog(this.blogId).subscribe(blog => this.blog$ = blog);
  }

}
