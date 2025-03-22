import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-feedback',
  templateUrl: './feedback.component.html',
  styleUrls: ['./feedback.component.css'],
  imports:[CommonModule]
})
export class FeedbackComponent {
  feedbacks = [
    {
      img: 'https://i.imgur.com/UQSIoIv.jpeg',
      name: 'Minh Thư',
      comment: 'Dịch vụ tốt Chị chủ dễ thương nữa <3',
      rating: 5
    },
    {
      img: 'https://i.imgur.com/KuQxH5c.jpeg',
      name: 'Khuong Ho Huu',
      comment: 'SP rất tốt cho thú cưng',
      rating: 5
    },
    {
      img: 'https://i.imgur.com/atJhLOL.png',
      name: 'Khanh Vy',
      comment: 'Hàng chất lượng, giá cả phải chăng. Chắc chắn sẽ ủng hộ dài dài',
      rating: 5
    }
  ];
  redirectToContact() {
    window.location.href = "http://localhost:4200/contact";
  }
  
}
