import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-coupon',
  templateUrl: './coupon.component.html',
  styleUrls: ['./coupon.component.css'],
  imports:[CommonModule]
})
export class CouponComponent {
  coupons = [
    { title: 'Miễn Phí Vận Chuyển', description: 'Áp dụng cho đơn hàng từ 369K. Tối đa giảm 20K', code: 'MPVC20' },
    { title: 'Giảm 30K', description: 'Áp dụng cho đơn hàng đầu tiên', code: 'FIRSTORDER' },
    { title: 'Giảm 3%', description: 'Giảm 3% (tối đa 12K) cho đơn từ 250K', code: 'HAPPY25' }
  ];

  copyCode(code: string) {
    navigator.clipboard.writeText(code).then(() => {
      alert('Đã sao chép: ' + code);
    });
  }
}