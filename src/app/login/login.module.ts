import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { BaseRequestOptions, Http } from '@angular/http';
import { MockBackend } from '@angular/http/testing';

import { LoginComponent } from './login.component';
import { LoginFormComponent } from './login-form/login-form.component';
import { LoginMessageComponent } from './login-message/login-message.component';

import { LoginService } from './shared/services/login.service';
import { MockLoginService } from './shared/services/mock-login.service';

export function httpFactory(backend: MockBackend, options: BaseRequestOptions): Http {
  return new Http(backend, options);
}

@NgModule({
  imports: [
    CommonModule,
    FormsModule
  ],
  declarations: [
    LoginComponent,
    LoginFormComponent,
    LoginMessageComponent
  ],
  exports: [
    LoginComponent,
    LoginFormComponent,
    LoginMessageComponent
  ],
  providers: [
    LoginService,
    MockBackend,
    BaseRequestOptions,
    {
      provide: Http,
      deps: [MockBackend, BaseRequestOptions],
      useFactory: httpFactory
    },
    MockLoginService
  ],
})
export class LoginModule { }
