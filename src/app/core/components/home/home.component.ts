import { Component, OnInit } from '@angular/core';

import { BlogService } from '../../../shared/services/blog.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
	blogs;
  showSpinner: boolean = true;
	
  constructor(private blogService: BlogService) { 
  	this.blogService.get4Blog().subscribe(blogs => {
      this.blogs = blogs;
      this.showSpinner = false;
    });
  }

  ngOnInit() {
    }
}