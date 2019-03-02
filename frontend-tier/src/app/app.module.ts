import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { ClarityModule } from '@clr/angular';
import { AppComponent } from './app.component';
import { FormsModule } from "@angular/forms";
import { HttpClientModule } from '@angular/common/http';
import { Apidetailscomponent } from './api-details/api-details.component';
import { appRouterModule } from './app.routes';
import { ChartsModule } from 'ng2-charts';
import { MessagingComponent } from './messaging/messaging.component';


@NgModule({
  declarations: [
    AppComponent,
    Apidetailscomponent,
    MessagingComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    ClarityModule,
    FormsModule,
    HttpClientModule,
    ChartsModule, 
    appRouterModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
