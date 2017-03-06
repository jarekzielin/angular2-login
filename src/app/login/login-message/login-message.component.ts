import { Component, Input } from '@angular/core';

import { IMessage } from '../shared/interfaces/login.interface';

@Component({
  selector: 'app-login-message',
  templateUrl: './login-message.component.html',
  styleUrls: ['./login-message.component.scss']
})
export class LoginMessageComponent {

  @Input() public message: IMessage;

  constructor() {

    this.message = {};
  }
}
