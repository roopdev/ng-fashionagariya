import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { BlogService } from '../../../shared/services/blog.service';
import { AuthService } from '../../../shared/services/auth.service';
import { UserService } from '../../../shared/services/user.service';

import { Upload } from '../../../shared/models/upload.model';

@Component({
  selector: 'app-blog-form',
  templateUrl: './blog-form.component.html',
  styleUrls: ['./blog-form.component.css']
})
export class BlogFormComponent implements OnInit {
	blog = {};
	userId;
	user;
  id;

  constructor(private blogService: BlogService,
  						private authService: AuthService,
  						private userService: UserService,
  						private router: Router,
              private route: ActivatedRoute) { 
  	this.userId = this.authService.currentUserId;
  	this.userService.get(this.userId).subscribe(user => this.user = user);
    this.id = this.route.snapshot.paramMap.get('id');
    if(this.id) {
      this.blogService.getBlog(this.id)
        .take(1).subscribe(
          p => this.blog = p.blog
        );
    }
  }

  ngOnInit() {
  }

  save(blog) {  
    if(this.id) {
      this.blogService.updateBlog(this.id, blog);
    } else {
      this.blogService.createBlog(blog, this.user);  
    }
    this.router.navigate(['/admin/blogs']);
  }

  delete() {
    if(!confirm('Are you sure want to delete this product?')) return;

    this.blogService.deleteBlog(this.id);
    this.router.navigate(['/admin/blogs']);
  }

}
