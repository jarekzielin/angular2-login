import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginMessageComponent } from './login-message.component';

describe('LoginMessageComponent', () => {
  let component: LoginMessageComponent;
  let fixture: ComponentFixture<LoginMessageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LoginMessageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginMessageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should not contain a message', () => {
    const compiled = fixture.debugElement.nativeElement;

    expect(component.message).toEqual({});
    expect(compiled.querySelector('div')).toBeNull();
  });

  it('should contain a success message', () => {
    const compiled = fixture.debugElement.nativeElement;
    component.message = {
      body: 'Okey!',
      type: 'success'
    };

    fixture.detectChanges();

    expect(compiled.querySelector('div')).not.toBeNull();
    expect(compiled.querySelector('div').textContent).toContain('Okey!');
    expect(compiled.querySelector('div').classList).toContain('success');
  });

  it('should contain an error message', () => {
    const compiled = fixture.debugElement.nativeElement;
    component.message = {
      body: 'Crap!',
      type: 'error'
    };

    fixture.detectChanges();

    expect(compiled.querySelector('div')).not.toBeNull();
    expect(compiled.querySelector('div').textContent).toContain('Crap');
    expect(compiled.querySelector('div').classList).toContain('error');
  });
});
