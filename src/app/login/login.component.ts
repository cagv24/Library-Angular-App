import { Component, OnInit } from '@angular/core';
import { NgModel } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { User } from '../models/user.model';
import { AppService } from './../app.service';
import { LoginService } from './login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [LoginService]
})

export class LoginComponent implements OnInit {
  /**
   * User's username.
   * 
   * @private
   * @type {string}
   * @memberof LoginComponent
   */
  public username: string;

  /**
   * User's password.
   * 
   * @private
   * @type {string}
   * @memberof LoginComponent
   */
  public password: string;

  public badLogIn: boolean;

  /**
   * Creates an instance of LoginComponent.
   * @param {LoginService} _loginService 
   * @param {AppService} _appService 
   * @param {Router} _router 
   * @param {ActivatedRoute} _route 
   * @memberof LoginComponent
   */
  constructor(
    private _loginService: LoginService,
    private _appService: AppService,
    private _router: Router,
    private _route: ActivatedRoute) {
    this.username = '';
    this.password = '';
  }

  ngOnInit() {

  }

  /**
   * Allows an user to Login.
   * 
   * @memberof LoginComponent
   */
  login(): void {
    this.badLogIn = false;
    this._loginService.login(this.username, this.password).subscribe(
      user => {
        const loggedUser: User = <User> user;
        loggedUser.password = this.password;
        this._appService.loggedUser = loggedUser;
        switch (loggedUser.userType) {
          case 1: this._router.navigate(['/autor']); break;
          case 2: this._router.navigate(['/revisor']); break;
          case 3: this._router.navigate(['/editor']); break; 
        }
      }, error => {
        this.badLogIn = true;
      }
    );
  }
}
