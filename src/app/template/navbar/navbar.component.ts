import { Router, ActivatedRoute } from '@angular/router';
import { AppService } from './../../app.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  toggleOpen: boolean;
  userType: string;
  isLoggedIn: boolean;
  constructor(private _appService: AppService, private _router: Router, private _route: ActivatedRoute) {
      if (this._appService.loggedUser) {
        this.userType = this.userPath();
        this.isLoggedIn = true;
      }
    }

  ngOnInit() {}

  toggleClick() {
      this.toggleOpen = !this.toggleOpen;
  }

  userPath(): string {
    switch (this._appService.loggedUser.userType) {
      case 1: {
        return 'autor';
      }
      case 2: {
        return 'revisor';
      }
      case 3: {
        return 'editor';
      }
    }
  }

  getName(): string {
    if (this._appService.loggedUser) {
      return this._appService.loggedUser.name;
    } else {
      return '';
    }
  }

  logout(): void {
    this._appService.loggedUser = undefined;
    this._router.navigate(['/']);
  }
}
