import { Injectable } from '@angular/core';
import { Http, RequestOptions, Headers } from '@angular/http';
import { Observable } from 'rxjs/Observable';

import { AppService } from './../../app.service';
import { Book } from '../../models/book.model';
import { Body } from '@angular/http/src/body';
import { environment } from './../../../environments/environment';

@Injectable()
export class ReviserService {

  /**
   * Creates an instance of ReviserService.
   * @param {Http} _http 
   * @param {AppService} _appService 
   * @memberof ReviserService
   */
  constructor(private _http: Http, private _appService: AppService) {}

  /**
   * 
   * 
   * @returns {Observable<any>} 
   * @memberof ReviserService
   */
  getBooksToCheck(): Observable<any> {
    const headers = new Headers({ 'Content-Type': 'application/json' });
    headers.append('Authorization', 'Basic ' +
    btoa(this._appService.loggedUser.username + ':' + this._appService.loggedUser.password));
    const options = new RequestOptions({ headers: headers });
    return this._http
        .get(`${ environment.endpoint }/revisor/${ this._appService.loggedUser.username }/libros`, options)
        .map(this._appService.extractData)
        .catch(this._appService.handleError);
  }

  /**
   * 
   * 
   * @param {Book} book 
   * @returns {Observable<any>} 
   * @memberof ReviserService
   */
  rateBook(book: Book): Observable<any> {
    const headers = new Headers({ 'Content-Type': 'application/json' });
    headers.append('Authorization', 'Basic ' +
    btoa(this._appService.loggedUser.username + ':' + this._appService.loggedUser.password));
    const options = new RequestOptions({ headers: headers });
    return this._http
        .put(`${ environment.endpoint }/revisor/${ this._appService.loggedUser.username }/libros`, book, options)
        .map(this._appService.extractData)
        ._catch(this._appService.handleError);
  }
}
