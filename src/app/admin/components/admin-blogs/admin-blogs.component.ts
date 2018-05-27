import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { DataTableResource } from 'angular-4-data-table';

import { BlogService } from '../../../shared/services/blog.service';
import { Blog } from '../../../shared/models/blog.model';

@Component({
  selector: 'app-admin-blogs',
  templateUrl: './admin-blogs.component.html',
  styleUrls: ['./admin-blogs.component.css']
})
export class AdminBlogsComponent implements OnInit {
	blogs: Blog[] = [];
	tableResource: DataTableResource<Blog>;
	items: Blog[] = [];
	itemCount: number;

  constructor(private blogService: BlogService) { 
  	this.blogService.getAll()
  			.subscribe(blogs => {
  				this.blogs = blogs;
  				this.initializeTable(blogs);
  			});
  }

  private initializeTable(blogs: Blog[]) {
  	this.tableResource = new DataTableResource(blogs);
  	this.tableResource.query({ offset: 0 })
  		.then(items => this.items = items);
  	this.tableResource.count()
  		.then(count => this.itemCount = count);
  }

  reloadItems(params) {
  	if(!this.tableResource) return;

  	this.tableResource.query(params)
  		.then(items => this.items = items);
  }

  filter(query: string) {
  	let filteredBlogs = (query) ?
  		this.blogs.filter(p => p.title.toLowerCase().includes(query.toLowerCase())) :
  		this.blogs;

  	this.initializeTable(filteredBlogs);
  }

  ngOnInit() {
  }

}
