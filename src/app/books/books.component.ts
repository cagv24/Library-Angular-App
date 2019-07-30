import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { Book } from '../models/book.model';

@Component({
  selector: 'app-books',
  templateUrl: './books.component.html',
  styleUrls: ['./books.component.css']
})
export class BooksComponent implements OnInit {

  /**
   * Books to be rendered.
   *
   * @type {Book[]}
   * @memberof BooksComponent
   */
  @Input() books: Book[];

  /**
   * User's type who is using the component.
   *
   * @type {number}
   * @memberof BooksComponent
   */
  @Input() userType: number;

  /**
   * Send the book modified
   *
   * @type {EventEmitter<Book>}
   * @memberof BooksComponent
   */
  @Output() emittedBook: EventEmitter<Book> = new EventEmitter();

  /**
   * Creates an instance of BooksComponent.
   * @memberof BooksComponent
   */
  constructor () {}


  ngOnInit() {

  }
  
  /**
   * Sends the edited book to the parent with the new state.
   *
   * @param {Book} book - Edited book.
   * @param {number} state - Book's state.
   * @memberof BooksComponent
   */
  editorAction(book: Book , state: number): void {
    book.state = state;
    this.emittedBook.emit(book);
  }

  /**
   * Sends the book with the new score.
   *
   * @param {Book} book - Checked book.
   * @memberof BooksComponent
   */
  reviserAction(book: Book): void {
    this.emittedBook.emit(book);
  }

}
