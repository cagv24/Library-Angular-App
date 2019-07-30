import { IBook } from './../models/book.model';
import { LibraryService } from './library.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-library',
  templateUrl: './library.component.html',
  styleUrls: ['./library.component.css'],
  providers: [LibraryService]
})
export class LibraryComponent implements OnInit {
  /**
   * Input wrote by the User to search books.
   * 
   * @type {string}
   * @memberof LibraryComponent
   */
  public search: string;
  /**
   * Is the type of search the user wants to do: 1 by name, 2 by genre.
   * 
   * @type {number}
   * @memberof LibraryComponent
   */
  public searchType: number;

  /**
   * Stores the books returned from the query.
   * 
   * @type {IBook[]}
   * @memberof LibraryComponent
   */
  public books: IBook[];

  /**
   * Indicates if the user already made a search or not.
   * 
   * @type {boolean}
   * @memberof LibraryComponent
   */
  public hasSearch: boolean;

  /**
   * Indicates if an error exists in the user's query.
   * 
   * @type {boolean}
   * @memberof LibraryComponent
   */
  public searchError: boolean;

  constructor(private _libraryService: LibraryService) {
    this.searchType = 1;
  }

  ngOnInit() {
  }

  /**
   * Searches published books in the Library.
   * 
   * @memberof LibraryComponent
   */
  public searchMethod(): void {
    this.books = undefined;
    this._libraryService.searchBooks(this.search, this.searchType).subscribe(
      books => {
        this.books = <IBook[]> books;
        this.searchError = false;
      }, error => {
        this.searchError = true;
      }
    );
    this.hasSearch = true;
  }

}
