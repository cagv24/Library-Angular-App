import { Injectable } from '@angular/core';
import { Http, Response, RequestOptions, Headers } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

import { User } from './../models/user.model';
import { AppService } from '../app.service';
import { environment } from './../../environments/environment';

@Injectable()
export class SigninService {

    public loggedUser: User;

    constructor(private _http: Http, private _appService: AppService) { }

    signIn(user: User): Observable<any> {
        const headers = new Headers({ 'Content-Type': 'application/json' });
        const options = new RequestOptions({ headers: headers });
        return this._http
            .post(`${ environment.endpoint }/usuario/signin`, JSON.stringify(user), options)
            .map(this._appService.extractData)
            .catch(this._appService.handleError);
    }
}
