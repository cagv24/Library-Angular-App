import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule, Routes } from '@angular/router';

import {ToastyModule} from 'ng2-toasty';

import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { SigninComponent } from './signin/signin.component';
import { NavbarComponent } from './template/navbar/navbar.component';
import { FooterComponent } from './template/footer/footer.component';
import { BooksComponent } from './books/books.component';
import { ReviserComponent } from './user/reviser/reviser.component';
import { EditorComponent } from './user/editor/editor.component';
import { AuthorComponent } from './user/author/author.component';
import { IndexComponent } from './index/index.component';
import { LibraryComponent } from './library/library.component';
import { LoginRouteGuard } from './security/loginRouteGuard.service';
import { AppService } from './app.service';
import { LoginService } from './login/login.service';

const appRoutes: Routes = [
  {
    path: '',
    component: AppComponent,
    children: [
      { path: '', component: IndexComponent },
      { path: 'libros', component: LibraryComponent },
      { path: 'autor', component: AuthorComponent, canActivate: [LoginRouteGuard]},
      { path: 'editor', component: EditorComponent, canActivate: [LoginRouteGuard] },
      { path: 'revisor', component: ReviserComponent, canActivate: [LoginRouteGuard]}
    ]
  }
];

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SigninComponent,
    NavbarComponent,
    FooterComponent,
    BooksComponent,
    ReviserComponent,
    EditorComponent,
    AuthorComponent,
    IndexComponent,
    LibraryComponent
  ],
  imports: [
    BrowserModule,
    NgbModule.forRoot(),
    ToastyModule.forRoot(),
    FormsModule,
    HttpModule,
    RouterModule.forRoot(appRoutes)
  ],
  providers: [
    AppService, LoginRouteGuard
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
