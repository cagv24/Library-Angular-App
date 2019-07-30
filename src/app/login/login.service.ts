import { Injectable } from '@angular/core';
import { Http, Response, RequestOptions, Headers } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

import { AppService } from '../app.service';
import { User } from './../models/user.model';
import { environment } from './../../environments/environment';

@Injectable()
export class LoginService {

    /**
     * Saves application-wide the logged user.
     * 
     * @type {User}
     * @memberof LoginService
     */
    public loggedUser: User;

    /**
     * Creates an instance of LoginService.
     * @param {Http} _http 
     * @param {AppService} _appService 
     * @memberof LoginService
     */
    constructor(private _http: Http, private _appService: AppService) { }

    /**
     * Allows an User to login into the application.
     * 
     * @param {String} username 
     * @param {String} password 
     * @returns {Observable<any>} 
     * @memberof LoginService
     */
    login(username: String, password: String): Observable<any> {
        const headers = new Headers({ 'Content-Type': 'application/json' });
        headers.append('Authorization', 'Basic ' + btoa(username + ':' + password));
        const options = new RequestOptions({ headers: headers });
        return this._http
            .get(`${ environment.endpoint }/usuario/${ username }/login`, options)
            .map(this._appService.extractData)
            .catch(this._appService.handleError);
    }
}
