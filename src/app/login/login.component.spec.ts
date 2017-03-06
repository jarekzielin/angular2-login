import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MockBackend } from '@angular/http/testing';
import { FormsModule } from '@angular/forms';

import { Observable } from 'rxjs/Observable';

import { LoginComponent } from './login.component';
import { LoginFormComponent } from './login-form/login-form.component';
import { LoginMessageComponent } from './login-message/login-message.component';
import { ILogin, ILoginResponse } from './shared/interfaces/login.interface';
import { LoginService } from './shared/services/login.service';
import { MockLoginService } from './shared/services/mock-login.service';

class MLoginService {

  public login(data: ILogin): Observable<ILoginResponse> {
    return new Observable(o => {
      o.next({});
      o.complete();
    })
  }
}

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ FormsModule ],
      declarations: [
        LoginComponent,
        LoginFormComponent,
        LoginMessageComponent
      ],
      providers: [
        {
          provide: LoginService,
          useClass: MLoginService

        },
        MockLoginService,
        MockBackend,
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render a h1 tag', async(() => {
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('h1').textContent).toContain('Login');
  }));

  describe('login', () => {

    let loginService: LoginService, compiled;
    beforeEach(() => {
      loginService = fixture.debugElement.injector.get(LoginService);
      compiled = fixture.debugElement.nativeElement;
    });

    it('should successful login', () => {
      spyOn(loginService, 'login').and.returnValue(
        new Observable(o => {
          o.next({
            authenticated: true,
            message: 'login OK'
          });
          o.complete();
        })
      );
      const loginData = {
        email: 'one@example.com',
        password: 'letmein',
        remember: true
      };

      component.login(loginData);

      expect(loginService.login).toHaveBeenCalledWith({
        email: 'one@example.com',
        password: 'letmein',
        remember: true
      });
      expect(component.isAuthenticated).toEqual(true);
      expect(component.message).toEqual({
        body: 'login OK',
        type: 'success'
      });

      fixture.detectChanges();
      expect(compiled.querySelector('h1').textContent).toContain('Logged in');
    });

    it('should not login because of failure', () => {
      spyOn(loginService, 'login').and.returnValue(
        new Observable(o => {
          o.next({
            authenticated: false,
            message: 'invalid email'
          });
          o.complete();
        })
      );
      const loginData = {
        email: 'one-example.com',
        password: 'letmein',
        remember: true
      };

      component.login(loginData);

      expect(loginService.login).toHaveBeenCalledWith({
        email: 'one-example.com',
        password: 'letmein',
        remember: true
      });
      expect(component.isAuthenticated).toEqual(false);
      expect(component.message).toEqual({
        body: 'invalid email',
        type: 'error'
      });

      fixture.detectChanges();
      expect(compiled.querySelector('h1').textContent).toContain('Login');
    });

    it('should not login because of server error', () => {
      spyOn(loginService, 'login').and.returnValue(
        new Observable(o => {
          o.error({});
          o.complete();
        })
      );
      const loginData = {
        email: 'one@example.com',
        password: 'letmein',
        remember: true
      };

      component.login(loginData);

      expect(loginService.login).toHaveBeenCalledWith({
        email: 'one@example.com',
        password: 'letmein',
        remember: true
      });
      expect(component.isAuthenticated).toEqual(false);
      expect(component.message).toEqual({
        body: 'server error',
        type: 'error'
      });

      fixture.detectChanges();
      expect(compiled.querySelector('h1').textContent).toContain('Login');
    });
  });

  describe('resetMessage', () => {

    it('should reset a message', () => {
      component.message = {
        body: 'Okey!',
        type: 'success'
      };

      component.resetMessage();

      expect(component.message).toEqual({});
    });
  });
});
