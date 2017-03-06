import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';

import { LoginFormComponent } from './login-form.component';

describe('LoginFormComponent', () => {
  let component: LoginFormComponent;
  let fixture: ComponentFixture<LoginFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ FormsModule ],
      declarations: [ LoginFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create and set init values', () => {
    expect(component).toBeTruthy();
    expect(component.email).toEqual('');
    expect(component.password).toEqual('');
    expect(component.remember).toEqual(true);
  });

  describe('onSubmit', () => {

    it('should invoke form data submit', () => {
      spyOn(component.submitInvoked, 'emit');
      component.email = 'one@example.com';
      component.password = 'letmein';

      component.onSubmit();

      expect(component.submitInvoked.emit).toHaveBeenCalledWith({
        email: 'one@example.com',
        password: 'letmein',
        remember: true
      });
    });
  });

  describe('onFocus', () => {

    it('should invoke iput focus', () => {
      spyOn(component.focusInvoked, 'emit');

      component.onFocus();

      expect(component.focusInvoked.emit).toHaveBeenCalledWith(true);
    });
  });
});
