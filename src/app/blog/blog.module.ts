import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';


import { SharedModule } from '../shared/shared.module';

import { BlogsComponent } from './components/blogs/blogs.component';
import { BlogSingleComponent } from './components/blogs/blog-single/blog-single.component';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild([
      { path: 'blog/:id', component: BlogSingleComponent },
    	{ path: 'blog', component: BlogsComponent }
    ])
  ],
  declarations: [
  BlogsComponent,
  BlogSingleComponent
  ]
})
export class BlogModule { }
