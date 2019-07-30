import { Component, OnInit } from '@angular/core';

import { ToastyService, ToastyConfig, ToastOptions } from 'ng2-toasty';

import { Book } from './../../models/book.model';
import { EditorService } from './editor.service';
import { IBook } from '../../models/book.model';


@Component({
  selector: 'app-editor',
  templateUrl: './editor.component.html',
  styleUrls: ['./editor.component.css'],
  providers: [EditorService]
})

export class EditorComponent implements OnInit {

  /**
   * Books to be published.
   *
   * @private
   * @type {IBook[]}
   * @memberof EditorComponent
   */
  public pendingBooks: IBook[];

  /**
   * Creates an instance of EditorComponent.
   * @param {EditorService} _editorService - Editor's service
   * @memberof EditorComponent
   */
  constructor(private _editorService: EditorService, private toastyService: ToastyService, private toastyConfig: ToastyConfig) { 
    // Assign the selected theme name to the `theme` property of the instance of ToastyConfig.  
    // Possible values: default, bootstrap, material 
    this.toastyConfig.theme = 'default';
    this.pendingBooks = [];
}
  /**
   * Call the editor's books from the service.
   *
   * @memberof EditorComponent
   */
  ngOnInit() {
    this.getPendingBooks();
  }

  /**
   * Obtains the pending books from the DB.
   *
   * @memberof EditorComponent
   */
  getPendingBooks(): void {
    this._editorService.getPendingBooks().subscribe(
      books => {
        this.pendingBooks = <IBook[]> books;
        }, error => {
        console.log(error);
      }
    );
  }

  /**
   * Updates the book in the DB.
   *
   * @param {Book} book - Book to be edited.
   * @memberof EditorComponent
   */
  editBook(book: Book): void {
    const toastOptions: ToastOptions = {
      title: '',
      msg: '',
      showClose: true,
      timeout: 3000,
      theme: 'default'
    };
    this._editorService.editBook(book).subscribe(
      response => {
        this.pendingBooks.splice(this.pendingBooks.findIndex(foundBook => foundBook.id === book.id), 1);
        toastOptions.title = 'Exito';
        switch (book.state) {
          case 2: toastOptions.msg = 'Libro publicado satisfactoriamente'; break;
          case 4: toastOptions.msg = 'Libro descartado satisfactoriamente'; break;
        }
        this.toastyService.success(toastOptions);
      }, error => {
        toastOptions.title = 'Error';
        switch (error.status) {
          case 404: toastOptions.msg  = 'Libro no encontrado.'; break;
          case 412: toastOptions.msg  = 'No hay suficientes revisores.'; break;
          case 500: toastOptions.msg  = 'Por favor intentelo de nuevo.'; break;
        }
        this.toastyService.error(toastOptions);
      }
    );
  }
}
