import { Injectable } from '@angular/core';
import { MockBackend, MockConnection } from '@angular/http/testing';
import { Response, ResponseOptions, RequestMethod } from '@angular/http';

import {
  EMAIL_REGEX,
  PASSWORD_REGEX,
  MOCKED_AUTHORIZED_EMAIL,
  MOCKED_AUTHORIZED_PASSORD,
  API_URL,
  LOGIN_ENDPOINT,
} from '../constants/constants';

@Injectable()
export class MockLoginService {

  constructor(
    private backend: MockBackend
  ) { }

  public init(): void {
    this.backend.connections.subscribe((conn: MockConnection) => {
      const URL = API_URL + LOGIN_ENDPOINT;

      if (conn.request.url === URL && conn.request.method === RequestMethod.Post) {
        const body: any = JSON.parse(conn.request.getBody());
        let response: any = {};

        if (body.email === MOCKED_AUTHORIZED_EMAIL && body.password === MOCKED_AUTHORIZED_PASSORD) {
          response = {
            authenticated: true,
            message: 'login successful'
          };

        } else {
          response.authenticated = false;

          if (!this.isEmailValid(body.email)) {
            response.message = 'invalid email';

          } else if (!this.isPasswordValid(body.password)) {
            response.message = 'invalid password';

          } else {
            response.message = 'invalid email or password';
          }
        }

        conn.mockRespond(new Response(new ResponseOptions({
          body: JSON.stringify(response)
        })));
      }
    });
  }

  private isEmailValid(email: string): boolean {

    return EMAIL_REGEX.test(email);
  }

  private isPasswordValid(password: string): boolean {

    return PASSWORD_REGEX.test(password);
  }
}
