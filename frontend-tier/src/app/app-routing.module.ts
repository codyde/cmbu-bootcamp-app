import { NgModule } from '@angular/core'
import { Routes, RouterModule } from '@angular/router'
import { MessagingComponent } from './messaging/messaging.component';

const routes: Routes = [
  { path: '', redirectTo: '/messaging', pathMatch: 'full' },
  { path: 'messaging', component: MessagingComponent }
  ];

  @NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule],
  })
  export class AppRoutingModule {}