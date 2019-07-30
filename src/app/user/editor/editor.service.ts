import { Observable } from 'rxjs/Observable';
import { Http, RequestOptions, Headers } from '@angular/http';
import { Injectable } from '@angular/core';

import { AppService } from './../../app.service';
import { Book } from './../../models/book.model';
import { environment } from './../../../environments/environment';

@Injectable()
export class EditorService {
    constructor(private _http: Http, private _appService: AppService) {}

    getPendingBooks(): Observable<any> {
        const headers = new Headers({ 'Content-Type': 'application/json' });
        headers.append('Authorization', 'Basic ' +
        btoa(this._appService.loggedUser.username + ':' + this._appService.loggedUser.password));
        const options = new RequestOptions({ headers: headers });
        return this._http
            .get(`${ environment.endpoint }/editor/libros`, options)
            .map(this._appService.extractData)
            .catch(this._appService.handleError);
    }

    editBook(book: Book): Observable<any> {
        const headers = new Headers({ 'Content-Type': 'application/json' });
        headers.append('Authorization', 'Basic ' +
        btoa(this._appService.loggedUser.username + ':' + this._appService.loggedUser.password));
        const options = new RequestOptions({ headers: headers });
        return this._http
            .put(`${ environment.endpoint }/editor/libros`, book, options)
            .map(this._appService.extractData)
            ._catch(this._appService.handleError);
    }
}
