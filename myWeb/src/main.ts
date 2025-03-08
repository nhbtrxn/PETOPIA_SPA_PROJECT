import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { provideRouter } from '@angular/router';
import { AppRoutes } from './app/app.routes'; // Định nghĩa route của bạn

bootstrapApplication(AppComponent, {
  providers: [provideRouter(AppRoutes)]
}).catch(err => console.error(err));
