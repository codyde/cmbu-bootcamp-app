import { NgModule } from '@angular/core'
import { Routes, RouterModule } from '@angular/router'
import { AppComponent } from './app.component'
import { Apidetailscomponent } from './api-details/api-details.component'
import { MessagingComponent } from './messaging/messaging.component';

const routes: Routes = [
  { path: '', redirectTo: '/messaging', pathMatch: 'full' },
  { path: 'detail', component: Apidetailscomponent },
  { path: 'messaging', component: MessagingComponent }
  ];

  @NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule],
  })
  export class AppRoutingModule {}