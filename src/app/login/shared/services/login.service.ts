import { Injectable } from '@angular/core';
import { Http, Headers, Response, RequestOptions } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

import { ILogin, ILoginResponse } from '../interfaces/login.interface';
import { API_URL, LOGIN_ENDPOINT } from '../constants/constants';

@Injectable()
export class LoginService {

  constructor(
    private http: Http
  ) { }

  public login(data: ILogin): Observable<ILoginResponse> {

    const url = API_URL + LOGIN_ENDPOINT;
    const body = JSON.stringify(data);

    return this.http.post(url, body, this.setHeaders())
      .map(res => <ILoginResponse> res.json())
      .catch(this.handleError);
  }

  private setHeaders(): RequestOptions {

    const options = new RequestOptions({
      headers: new Headers()
    });

    options.headers.set('Content-Type', 'application/json');

    return options;
  }

  private handleError (error: Response) {

    return Observable.throw(error.json().error || 'Server error');
  }
}
