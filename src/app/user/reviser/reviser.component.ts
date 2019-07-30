import { Component, OnInit } from '@angular/core';
import { ToastyService, ToastyConfig, ToastOptions } from 'ng2-toasty';

import { ReviserService } from './reviser.service';
import { Book, IBook } from './../../models/book.model';

@Component({
  selector: 'app-reviser',
  templateUrl: './reviser.component.html',
  styleUrls: ['./reviser.component.css'],
  providers: [ReviserService]

})
export class ReviserComponent implements OnInit {
  
  /**
   * Contains the books to check
   * 
   * @type {IBook[]}
   * @memberof ReviserComponent
   */
  public booksToCheck: IBook[];
  
  /**
   * Creates an instance of ReviserComponent.
   * @param {ReviserService} _reviserService
   * @memberof ReviserComponent
   */
  constructor(private _reviserService: ReviserService,
    private toastyService: ToastyService, 
    private toastyConfig: ToastyConfig) {
    this.booksToCheck = [];
    this.toastyConfig.theme = 'default';
  }

  /**
   * Gets the books to check from the service.
   * 
   * @memberof ReviserComponent
   */
  ngOnInit() {
    this.getBooksToCheck();
  }

  /**
   * Gets the books to check from the DB.
   * 
   * @memberof ReviserComponent
   */
  getBooksToCheck(): void {
    this._reviserService.getBooksToCheck().subscribe(
      books => {
         this.booksToCheck = <IBook[]> books;
        }, error => {
        console.log(error);
      }
    );
  }

  /**
   * Rates the books edited by the reviser.
   *
   * @param {Book} book - Book to be edited.
   * @memberof ReviserComponent
   */
  rateBook(book: Book): void {
    this._reviserService.rateBook(book).subscribe(
      response => {
        this.booksToCheck.splice(this.booksToCheck.findIndex(foundBook => foundBook.id === book.id), 1);
        this.reviserToasty('Libro calificado satisfactoriamente', true);
      }, error => {
        console.log(error);
        this.reviserToasty('Por favor intentelo de nuevo', false);
      }
    );
  }

  reviserToasty(msg: string, success: boolean): void {
    const toastOptions: ToastOptions = {
      title: '',
      msg: '',
      showClose: true,
      timeout: 3000,
      theme: 'default'
    };
    toastOptions.msg = msg;
    if (success) {
      toastOptions.title = 'Exito';
      this.toastyService.success(toastOptions);
    } else {
      toastOptions.title = 'Error';
      this.toastyService.error(toastOptions);
    }
  }

}
