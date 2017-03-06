import { Component, Output, EventEmitter } from '@angular/core';

import { ILogin } from '../shared/interfaces/login.interface';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss']
})
export class LoginFormComponent {

  public email: string;
  public password: string;
  public remember: boolean;

  @Output() public submitInvoked: EventEmitter<ILogin> = new EventEmitter();
  @Output() public focusInvoked: EventEmitter<boolean> = new EventEmitter();

  constructor() {

    this.email = '';
    this.password = '';
    this.remember = true;
  }

  public onSubmit(): void {

    this.submitInvoked.emit({
      email: this.email,
      password: this.password,
      remember: this.remember
    });
  }

  public onFocus(): void {

    this.focusInvoked.emit(true);
  }
}
