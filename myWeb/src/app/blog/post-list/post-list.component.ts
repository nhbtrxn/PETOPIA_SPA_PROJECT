import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-post-list',
  imports: [RouterModule, CommonModule],
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.css']
})
export class PostListComponent {
  posts = [
    { id: 1, title: 'Cách chăm sóc chó con' },
    { id: 2, title: 'Mẹo huấn luyện mèo đi vệ sinh đúng chỗ' },
    { id: 3, title: 'Thực phẩm tốt nhất cho thú cưng' }
  ];
}
