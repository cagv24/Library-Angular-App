import { Component, OnInit } from '@angular/core';
import { NgModel } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { User } from '../models/user.model';
import { AppService } from './../app.service';
import { SigninService } from './signin.service';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css'],
  providers: [SigninService]
})
export class SigninComponent implements OnInit {

  /**
   * User who's signing into the application.
   * 
   * @private
   * @type {User}
   * @memberof SigninComponent
   */
  private user: User;

  /**
   * Creates an instance of SigninComponent.
   * @param {SigninService} _signInService 
   * @param {AppService} _appService 
   * @param {Router} _router 
   * @param {ActivatedRoute} _route 
   * @memberof SigninComponent
   */
  constructor(
    private _signInService: SigninService,
    private _appService: AppService,
    private _router: Router,
    private _route: ActivatedRoute) {
    this.user = new User();
    this.user.username = '';
    this.user.password = '';
    this.user.email = '';
    this.user.name = '';
    this.user.lastName = '';
    this.user.userType = 0;
  }

  ngOnInit() {
  }

  /**
   * Allows an User to signin into the application.
   * 
   * @memberof SigninComponent
   */
  signIn(): void {
    this._signInService.signIn(this.user).subscribe(user => {
      this._appService.loggedUser = user;
      this._appService.loggedUser.password = this.user.password;
      if (user.userType === 1) {
        this._router.navigate(['/autor']);
      } else if (user.userType === 2) {
        this._router.navigate(['/revisor']);
      }
    }, error => {
      console.log('Error');
    });
  }
}
