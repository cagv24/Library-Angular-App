import { Injectable } from '@angular/core';
import { Http, Response, RequestOptionsArgs, Headers} from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { Request } from '@angular/http/src/static_request';

import { AppService } from './../app.service';
import { User } from './../models/user.model';
import { environment } from './../../environments/environment';

@Injectable()
export class LibraryService {
    
    constructor(private _http: Http, private _appService: AppService) { }

    searchBooks(search: string, searchType: number): Observable<any> {
        const headers = new Headers({'Content-Type': 'application/json'});
        let params;
        switch (Number(searchType)) {
            case 1: params = `?nombre=${ search }`; break;
            case 2: params = `?genero=${ search }`; break; 
        }
        const options: RequestOptionsArgs = {headers: headers};
        return this._http
            .get(`${ environment.endpoint }/libros${ params }`, options)
            .map(this._appService.extractData)
            .catch(this._appService.handleError);
    }    
}
