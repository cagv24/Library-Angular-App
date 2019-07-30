import { AppService } from './../../app.service';
import { Component, OnInit } from '@angular/core';

import { AuthorService } from './author.service';
import { Book, IBook } from './../../models/book.model';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { ToastyService, ToastyConfig, ToastOptions } from 'ng2-toasty';

@Component({
  selector: 'app-author',
  templateUrl: './author.component.html',
  styleUrls: ['./author.component.css'],
  providers: [AuthorService]
})


export class AuthorComponent implements OnInit {
  /**
   * Books written by the Author.
   * 
   * @private
   * @type {IBook[]}
   * @memberof AuthorComponent
   */
  private writtenBooks: IBook[];

  /**
   * Book to be added.
   * 
   * @private
   * @type {Book}
   * @memberof AuthorComponent
   */
  private addedBook: Book;

  /**
   * Creates a local reference to NgBootstrap's Modal.
   * 
   * @private
   * @type {NgbModalRef}
   * @memberof AuthorComponent
   */
  private modalRef: NgbModalRef;

  /**
   * Creates an instance of AuthorComponent.
   * @param {AuthorService} _authorService 
   * @param {NgbModal} _modalService 
   * @param {AppService} _appService 
   * @param {ToastyService} toastyService 
   * @param {ToastyConfig} toastyConfig 
   * @memberof AuthorComponent
   */
  constructor(private _authorService: AuthorService, 
    private _modalService: NgbModal, 
    private _appService: AppService, 
    private toastyService: ToastyService, 
    private toastyConfig: ToastyConfig) {
    this.addedBook = new Book();
    this.addedBook.name = '';
    this.addedBook.format = '';
    this.addedBook.genre = '';
    this.addedBook.autor = this._appService.loggedUser.username;
    this.toastyConfig.theme = 'default';
    this.writtenBooks = [];
  }

  ngOnInit() {
    this.getBooks();
  }

  /**
   * Gets books written by the Author.
   * 
   * @memberof AuthorComponent
   */
  getBooks(): void {
    this._authorService.getWrittenBooks().subscribe(
      books => {
         this.writtenBooks = <IBook[]> books;
        }, error => {
        console.log(error);
      }
    );
  }

  /**
   * Post a new book in the Library.
   * 
   * @memberof AuthorComponent
   */
  postBook(): void {
    this._authorService.postBook(this.addedBook).subscribe(
      book => {
        console.log('Sucessful');
        this.writtenBooks.unshift(this.addedBook);
        this.modalRef.close();
        this.authorToasty('Libro añadido satisfactoriamente.', true);
        this.addedBook = new Book();
      }, error => {
        this.authorToasty('Por favor intentelo de nuevo.', false);
      }
    );
  }

  /**
   * Creates and display's ngx-toasty.
   * 
   * @param {string} msg 
   * @param {boolean} success 
   * @memberof AuthorComponent
   */
  authorToasty(msg: string, success: boolean): void {
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

  /**
   * Opens Add Books' modal.
   * 
   * @param {any} content 
   * @memberof AuthorComponent
   */
  open(content) {
    this.modalRef = this._modalService.open(content);
  }
}
