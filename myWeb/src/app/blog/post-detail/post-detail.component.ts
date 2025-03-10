import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-post-detail',
  templateUrl: './post-detail.component.html',
  styleUrls: ['./post-detail.component.css']
})
export class PostDetailComponent {
  postId: number | null = null;
  postTitle = '';
  postContent = '';

  posts = [
    { id: 1, 
      title: 'Cách chăm sóc chó con', 
      content: 'Chi tiết cách chăm sóc chó con cho người mới bắt đầu nuôi' 
    },
    { id: 2, 
      title: 'Mẹo huấn luyện mèo đi vệ sinh đúng chỗ', 
      content: 'Hướng dẫn huấn luyện mèo...' 
    },
    { id: 3, 
      title: 'Thực phẩm tốt nhất cho thú cưng', 
      content: 'Danh sách thực phẩm tốt...' 
    }
  ];

  constructor(private route: ActivatedRoute) {}

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.postId = Number(params['id']);
      let post = this.posts.find(p => p.id === this.postId);
      if (post) {
        this.postTitle = post.title;
        this.postContent = post.content;
      }
    });
  }
}
