import { AppService } from './../app.service';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Injectable } from '@angular/core';

@Injectable()
export class LoginRouteGuard implements CanActivate {

    constructor(private _appService: AppService) {}

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
          let type = 0;
          switch (route.url[0].path) {
              case 'autor': {
                  type = 1;
                  break;
            }
              case 'revisor': {
                type = 2;
                break;
            }
              case 'editor': {
                  type = 3;
                  break;
            }
          }
        return this._appService.canAccess(type);
    }
}
