import { Component, OnInit } from '@angular/core';
import * as _ from 'lodash';

import { BlogService } from '../../../shared/services/blog.service';
import { Blog } from '../../../shared/models/blog.model';

@Component({
  selector: 'app-blogs',
  templateUrl: './blogs.component.html',
  styleUrls: ['./blogs.component.css']
})
export class BlogsComponent implements OnInit {
	blogs$: any;
  propBlog: any;
	showSpinner: boolean = true;

  constructor(private blogService: BlogService) { 
  	this.blogService.getAll().subscribe(blogs => {
  		this.blogs$ = blogs;
  		this.showSpinner = false;
  	});
    this.blogService.get4Blog().subscribe(values => {
      this.propBlog = values;
    })
  }

  ngOnInit() {
  }

}
