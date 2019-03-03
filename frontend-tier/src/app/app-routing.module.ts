import { NgModule } from '@angular/core'
import { Routes, RouterModule } from '@angular/router'
import { AppComponent } from './app.component'
import { HomeComponent } from './home/home.component';
import { Apidetailscomponent } from './api-details/api-details.component';
import { MessagingComponent } from './messaging/messaging.component';

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'detail', component: Apidetailscomponent },
  { path: 'messaging', component: MessagingComponent },
  { path: 'home', component: HomeComponent }
  ];

  @NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule],
  })
  export class AppRoutingModule {}