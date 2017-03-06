import { TestBed, inject } from '@angular/core/testing';
import { Http } from '@angular/http';
import { MockBackend } from '@angular/http/testing';

import { MockLoginService } from './mock-login.service';

describe('MockLoginService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        Http,
        MockBackend,
        MockLoginService
      ]
    });
  });

  it('should create an instance of service', inject([MockLoginService], (service: MockLoginService) => {
    expect(service).toBeTruthy();
  }));
});
