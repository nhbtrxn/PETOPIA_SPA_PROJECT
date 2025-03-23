import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, HttpClientModule, RouterModule, FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  emailOrPhone: string = '';
  password: string = '';

  constructor(private http: HttpClient, private router: Router) {}

  onLogin() {
    if (!this.emailOrPhone || !this.password) {
      alert('Vui lòng nhập đầy đủ thông tin đăng nhập');
      return;
    }

    const loginData = {
      emailOrPhone: this.emailOrPhone,
      password: this.password
    };

    this.http.post('http://localhost:3000/users/login', loginData).subscribe({
      next: (response: any) => {
        if (response.success) {
          alert('Đăng nhập thành công!');
          localStorage.setItem('user', JSON.stringify(response.user));
          this.router.navigate(['/homepage']);
        } else {
          alert(response.message || 'Email/SĐT hoặc mật khẩu không đúng');
        }
      },
      error: (error) => {
        console.error('Lỗi đăng nhập:', error);
        alert('Có lỗi xảy ra, vui lòng thử lại!');
      }
    });
  }
}
