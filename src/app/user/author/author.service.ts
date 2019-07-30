import { Observable } from 'rxjs/Observable';
import { Http, RequestOptions, Headers } from '@angular/http';
import { Injectable } from '@angular/core';

import { AppService } from './../../app.service';
import { Book } from './../../models/book.model';
import { environment } from './../../../environments/environment';


@Injectable()
export class AuthorService {

    /**
     * Creates an instance of AuthorService.
     * @param {Http} _http 
     * @param {AppService} _appService 
     * @memberof AuthorService
     */
    constructor(private _http: Http, private _appService: AppService) {}

    /**
     * Returns written books of the Author.
     * 
     * @returns {Observable<any>} 
     * @memberof AuthorService
     */
    getWrittenBooks(): Observable<any> {
        const headers = new Headers({ 'Content-Type': 'application/json' });
        headers.append('Authorization', 'Basic ' +
        btoa(this._appService.loggedUser.username + ':' + this._appService.loggedUser.password));
        const options = new RequestOptions({ headers: headers });
        return this._http
            .get(`${ environment.endpoint }/autor/${ this._appService.loggedUser.username }/libros`, options)
            .map(this._appService.extractData)
            .catch(this._appService.handleError);
    }

    /**
     * Adds a Book to the system.
     * 
     * @param {Book} book 
     * @returns {Observable<any>} 
     * @memberof AuthorService
     */
    postBook(book: Book): Observable<any> {
        const headers = new Headers({ 'Content-Type': 'application/json' });
        headers.append('Authorization', 'Basic ' +
        btoa(this._appService.loggedUser.username + ':' + this._appService.loggedUser.password));
        const options = new RequestOptions({ headers: headers });
        return this._http
            .post(`${ environment.endpoint }/autor/${ this._appService.loggedUser.username }/libros`, book, options)
            .map(this._appService.extractData)
            ._catch(this._appService.handleError);
    }
}
