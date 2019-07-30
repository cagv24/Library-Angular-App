import { Component, OnInit } from '@angular/core';
import { AppService } from './../app.service';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css']
})
export class IndexComponent implements OnInit {
  
  /**
   * Indicates if the Indext tab is selected.
   * 
   * @type {boolean}
   * @memberof IndexComponent
   */
  loginDisplay: boolean;

  /**
   * Indicates if the Signin tab is selected.
   * 
   * @type {boolean}
   * @memberof IndexComponent
   */
  signinDisplay: boolean;
  
  constructor() {
      this.loginDisplay = true;
  }

  ngOnInit() {}

  /**
   * Triggered when the user clicks in a menu option.
   * 
   * @param {boolean} showLogin 
   * @memberof IndexComponent
   */
  onMenuOption(showLogin: boolean) {
    this.signinDisplay = !showLogin;
    this.loginDisplay = showLogin;
  }

}
