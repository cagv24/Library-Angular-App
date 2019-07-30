import { User } from './models/user.model';
import { Injectable } from '@angular/core';
import { Http, Response, RequestOptions, Headers } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';

@Injectable()
export class AppService {

    public loggedUser: User;

    constructor(private _http: Http) { }

    public canAccess(type: number): boolean {
        if (this.loggedUser && this.loggedUser.userType === type) {
            return true;
        }
        return false;
    }

    public extractData(response: Response) {
        const body = response.text() ? response.json() : {}; // parse JSON string into JavaScript objects
        return body || {};
    }

    public handleError(error: Response | any) {
        // In a real world app, you might use a remote logging infrastructure
        let errMsg: string;
        console.log(error);
        if (error.status) {
            return Observable.throw(error);
        }
        if (error instanceof Response) {
            const body = error.json() || '';
            const err = body.error || JSON.stringify(body);
            errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
        } else {
            errMsg = error.message ? error.message : error.toString();
        }
        console.error(errMsg);
        return Observable.throw(error);
    }
}