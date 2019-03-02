import { NgModule } from '@angular/core'
import { Routes, RouterModule } from '@angular/router'
import { AppComponent } from './app.component'
import { Apidetailscomponent } from './api-details/api-details.component'
import { MessagingComponent } from './messaging/messaging.component';

// Route config let's you map routes to components
const routes: Routes = [
    // map '/persons' to the people list component
    {
      path: 'apidetail',
      component: Apidetailscomponent,
    },
    {
      path: 'messaging',
      component: MessagingComponent,
    },
    // map '/' to '/persons' as our default route
    {
      path: '',
      redirectTo: '/message',
      pathMatch: 'full'
    },
  ];

  @NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule],
  })
  export class AppRoutingModule {}