import { Component } from '@angular/core';

import { ILogin, IMessage } from './shared/interfaces/login.interface';
import { LoginService } from './shared/services/login.service';
import { MockLoginService } from './shared/services/mock-login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  public message: IMessage;
  public isAuthenticated: boolean;

  constructor(
    private loginService: LoginService,
    private mockLoginService: MockLoginService
  ) {
    this.mockLoginService.init();

    this.message = {};
    this.isAuthenticated = false;
  }

  public login(loginData: ILogin): void {

    this.loginService.login(loginData)
      .subscribe(
        res => {
          this.message = {
            body: res.message,
            type: res.authenticated ? 'success' : 'error'
          };
          this.isAuthenticated = res.authenticated;

          console.log(res);
        },
        err => {
          this.message = {
            body: 'server error',
            type: 'error'
          };

          console.log(err);
        }
      );
  }

  public resetMessage(): void {

    this.message = {};
  }
}
