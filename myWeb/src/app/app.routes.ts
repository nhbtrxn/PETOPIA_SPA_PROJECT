import { Routes } from '@angular/router';
import { PostListComponent } from './blog/post-list/post-list.component';
import { PostDetailComponent } from './blog/post-detail/post-detail.component';
import { BookingComponent } from './pages/booking/booking.component';
import { AboutComponent } from './pages/about/about.component';
import { ContactComponent } from './pages/contact/contact.component';
import { FaqComponent } from './pages/faq/faq.component';
import { PolicyComponent } from './pages/policy/policy.component';
import { HomepageComponent } from './pages/homepage/homepage.component';
import { BlogComponent } from './blog/blog.component';
import { ProductServiceComponent } from './product-service-pages/product-service/product-service.component';
import { ProductComponent } from './product-service-pages/product/product.component';
import { ServiceComponent } from './product-service-pages/service/service.component';
import { ServiceDetailComponent } from './service-detail/service-detail.component';
import { ProductDetailComponent } from './product-detail/product-detail.component';
export const AppRoutes: Routes = [
  { 
    path: 'blog', 
    component: BlogComponent,
    children: [
      { path: '', redirectTo: '1', pathMatch: 'full' }, // Mặc định mở bài viết đầu tiên (id = 1)
      { path: ':id', component: PostDetailComponent } // Hiển thị bài viết chi tiết khi có ID
    ] 
  },
  { path: 'booking', component: BookingComponent },
  { path: 'about', component: AboutComponent },
  { path: 'contact', component: ContactComponent },
  { path: 'faq', component: FaqComponent },
  { path: 'policy', component: PolicyComponent },
  { path: 'homepage', component: HomepageComponent },
  { path: 'product-service', component: ProductServiceComponent},
  { path: 'product', component: ProductComponent},
  { path: 'services', component: ServiceComponent }, 
  { path: 'service/:service_id', component: ServiceDetailComponent },
  { path: 'product/:product_id', component: ProductDetailComponent },
  { path: '', redirectTo: '/homepage', pathMatch: 'full' }, // Trang mặc định
  { path: '**', redirectTo: '/homepage' }, // Xử lý trang không tồn tại
];
