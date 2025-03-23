// import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule, Router } from '@angular/router';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [RouterModule, FormsModule, HttpClientModule,CommonModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  phone: string = '';
  email: string = '';
  errorMessage: string = '';
  constructor(private http: HttpClient, private router: Router) {}

  checkAccount() {
    if (!this.phone || !this.email) {
      this.errorMessage = "Vui lòng nhập số điện thoại và email!";
      return;
    }

    this.http.post('http://localhost:3000/users/check-account', { phone: this.phone, email: this.email }).subscribe({
      next: (response: any) => {
        console.log("Kiểm tra tài khoản:", response);
        if (response.exists) {
          alert("Tài khoản này đã tồn tại! Hãy đăng nhập.");
          this.router.navigate(['/login']);
        } else {
          this.router.navigate(['/register-1'], { queryParams: { phone: this.phone, email: this.email } });
        }
      },
      error: (error) => {
        console.error("Lỗi khi kiểm tra tài khoản:", error);
        this.errorMessage = "Đã có lỗi xảy ra, vui lòng thử lại!";
      }
    });
  }
}
