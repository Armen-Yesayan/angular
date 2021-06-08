import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {ReactiveFormsModule} from "@angular/forms";
import { RegisterComponent } from './components/register/register.component';
import { LoginComponent } from './components/login/login.component';
import {HttpClientModule} from "@angular/common/http";
import { NotFoundComponent } from './components/not-found/not-found.component';
import { HeaderComponent } from './components/header/header.component';
import {AdminComponent} from "./container/admin/admin.component";
import {AuthGuard} from "./guards/auth.guards";

import { SocialLoginModule, SocialAuthServiceConfig} from 'angularx-social-login';
import {FacebookLoginProvider } from 'angularx-social-login';

@NgModule({
  declarations: [
    AppComponent,
    AdminComponent,
    RegisterComponent,
    LoginComponent,
    NotFoundComponent,
    HeaderComponent,
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    AppRoutingModule,
    HttpClientModule,
    SocialLoginModule
  ],
  providers: [
    AuthGuard,
    {
      provide: 'SocialAuthServiceConfig',
      useValue: {
        autoLogin: false,
        providers: [
          {
            id: FacebookLoginProvider.PROVIDER_ID,
            provider: new FacebookLoginProvider('clientId')
          }
        ]
      } as SocialAuthServiceConfig,
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
