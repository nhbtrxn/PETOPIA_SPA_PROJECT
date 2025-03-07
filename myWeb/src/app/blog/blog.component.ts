import { Component } from '@angular/core';
import { PostListComponent } from './post-list/post-list.component';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-blog',
  imports: [PostListComponent, RouterModule],
  templateUrl: './blog.component.html',
  styleUrl: './blog.component.css'
})
export class BlogComponent {

}
