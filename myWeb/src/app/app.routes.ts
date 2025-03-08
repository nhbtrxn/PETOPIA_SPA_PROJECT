import { Routes } from '@angular/router';
import { BlogComponent } from './blog/blog.component';
import { BookingComponent } from './booking/booking.component';
import { AboutComponent } from './pages/about/about.component';
import { ContactComponent } from './pages/contact/contact.component';
import { FaqComponent } from './pages/faq/faq.component';
import { PolicyComponent } from './pages/policy/policy.component';

export const AppRoutes: Routes = [
  { path: 'blog', component: BlogComponent },
  { path: 'booking', component: BookingComponent },
  { path: 'about', component: AboutComponent },
  { path: 'contact', component: ContactComponent },
  { path: 'faq', component: FaqComponent },
  { path: 'policy', component: PolicyComponent },
  { path: '', redirectTo: '/blog', pathMatch: 'full' }, // Trang mặc định
  { path: '**', redirectTo: '/blog' } // Xử lý trang không tồn tại
];
