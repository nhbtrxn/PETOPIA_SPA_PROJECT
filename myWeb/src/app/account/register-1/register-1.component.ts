import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule, HttpHeaders } from '@angular/common/http';
import { Component, ElementRef, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { RegisteredSuccessfullyComponent } from '../../annoucement/registered-successfully/registered-successfully.component';

@Component({
  selector: 'app-register-1',
  standalone: true,
  imports: [CommonModule, HttpClientModule, FormsModule, RegisteredSuccessfullyComponent],
  templateUrl: './register-1.component.html',
  styleUrl: './register-1.component.css'
})
export class Register1Component {
  @ViewChild('fileInput') fileInput!: ElementRef;
  imageUrl: string | ArrayBuffer | null = null;
  showSuccessPopup: boolean = false;

  username: string = '';
  password: string = '';
  dob: string = '';
  phone: string = '';
  email: string = '';
  avatar: string = '';
  confirmPassword: string = '';
  IMGUR_CLIENT_ID = '8276f1ad88d01d4';

  constructor(private http: HttpClient, private route: ActivatedRoute, private router: Router) {}

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      console.log("Nhận params từ trang trước:", params);
      this.phone = params['phone'] || '';
      this.email = params['email'] || '';

    });
  }

  openFileInput() {
    this.fileInput.nativeElement.click();
  }

  onFileSelected(event: any) {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        this.imageUrl = e.target?.result as string;
      };
      reader.readAsDataURL(file);

      this.uploadToImgur(file); // Upload ảnh lên Imgur
    }
  }

  uploadToImgur(file: File) {
    const formData = new FormData();
    formData.append('image', file);

    const headers = new HttpHeaders()
    .set('Authorization', `Client-ID ${this.IMGUR_CLIENT_ID}`)
    .set('Accept', 'application/json');

    this.http.post('https://api.imgur.com/3/image', formData, { headers }).subscribe({
      next: (res: any) => {
        this.avatar = res.data.link; // Lưu đường dẫn ảnh từ Imgur
        console.log("Ảnh đã upload:", this.avatar);
      },
      error: (err) => console.error("Lỗi upload ảnh:", err)
    });
  }

  onRegister() {
    if (!this.username || !this.password || !this.email||!this.phone) {
      alert('Vui lòng điền đầy đủ thông tin');
      return;
    }

    if (this.password !== this.confirmPassword) {
      alert("Mật khẩu nhập lại không trùng khớp!");
      return;
    }

    const userData = {
      username: this.username,
      password: this.password,
      dob: this.dob,
      phone: this.phone,
      email: this.email,
      avatar: this.avatar
    };

    this.http.post('http://localhost:3000/register', userData).subscribe({
      next: (response) => {
          console.log('Đăng ký thành công', response);
      },
      error: (error) => {
          console.error('Lỗi đăng ký', error);
      },
      complete: () => {
          console.log('Hoàn tất quá trình đăng ký');
      }
  });
  this.showSuccessPopup = true;

  }

  closePopup() {
    this.showSuccessPopup = false;
    this.router.navigate(['/login']); // Chuyển sang trang login
  }
  
}
