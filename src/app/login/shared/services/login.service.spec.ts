import { TestBed, inject, fakeAsync } from '@angular/core/testing';
import {
  HttpModule,
  XHRBackend,
  ResponseOptions,
  Response,
  RequestMethod,
} from '@angular/http';
import { MockBackend, MockConnection } from '@angular/http/testing';

import { LoginService } from './login.service';

describe('LoginService', () => {
  let mockbackend: any, service: LoginService;
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ HttpModule ],
      providers: [
        LoginService,
        {
          provide: XHRBackend,
          useClass: MockBackend
        }
      ]
    });
  });

  beforeEach(
    fakeAsync(
      inject(
        [XHRBackend, LoginService],
        (mockBackend: XHRBackend, loginService: LoginService) => {
          service = loginService;
          mockbackend = mockBackend;
        })));

  describe('login', () => {

    it('should post login data', () => {

      let response: any;
      let connection: MockConnection;
      mockbackend.connections.subscribe((conn: MockConnection) => {
        const options = new ResponseOptions({
          status: 200,
          body: JSON.stringify({
            authenticated: true,
            message: 'login successful'
          }),
        });

        conn.mockRespond(new Response(options));
        connection = conn;
      });

      service.login({
        email: 'one@example.com',
        password: 'letmein',
        remember: true
      }).subscribe(res => {
          response = res;

          expect(connection.request.url).toEqual(
            'http://localhost:8080/api/login');
          expect(connection.request.getBody()).toEqual(
            JSON.stringify({
              email: 'one@example.com',
              password: 'letmein',
              remember: true
            }));
          expect(
            connection.request.method
          ).toBe(RequestMethod.Post);
        });

      expect(response).toEqual({
        authenticated: true,
        message: 'login successful'
      });
    });
  });
});
