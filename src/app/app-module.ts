import { NgModule, provideBrowserGlobalErrorListeners } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing-module';
import { App } from './app';
import { Header } from './header/header';
import { Carousel } from './carousel/carousel';
import { MovingText } from './moving-text/moving-text';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Login } from './login/login';
import { Home } from './home/home';
import { CreateUpdateUser } from './create-update-user/create-update-user';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { UserListing } from './user-listing/user-listing';



@NgModule({
  declarations: [
    App,
    Header,
    Carousel,
    MovingText,
    Login,
    Home,
    CreateUpdateUser,
    UserListing,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    FormsModule
  ],
  providers: [
    provideBrowserGlobalErrorListeners(),
  ],
  bootstrap: [App]
})
export class AppModule { }
