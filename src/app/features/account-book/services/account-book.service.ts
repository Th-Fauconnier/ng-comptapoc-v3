import { HttpClient } from '@angular/common/http';
import { signal, inject, Injectable } from '@angular/core';
import { environment } from '../../../env/environment.development';
import { AccountBook } from '../../../models/account-book';
import { Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AccountBookService {

  private httpClient = inject( HttpClient );
  private readonly apiUrl = environment.apiUrl + '/accountBook';

  private _accountBooks = signal<AccountBook[]>([]);
  readonly accountBooks = this._accountBooks.asReadonly();

  private _accountBookDetail = signal<AccountBook>( {} as AccountBook );
  readonly accountBookDetail = this._accountBookDetail.asReadonly();

  addAccount( accountBook: AccountBook ){
    // On copie la liste existante et on y ajoute le nouvel élément
    this._accountBooks.update( accountBooks => [...accountBooks, accountBook] );
  }

  private changeAccountBook( modifiedAccountBook : AccountBook ) {
    this._accountBooks.update( currentBooks => {
      return currentBooks.map( book => book.id === modifiedAccountBook.id ? modifiedAccountBook : book
      );
    });
  }

  getAccountBooks(): Observable<AccountBook[]> {
    return this.httpClient.get<AccountBook[]>( this.apiUrl + '/all' )
    .pipe(
      tap( ( data ) => {
        console.log( data );
        this._accountBooks.set( data );
      })
    )
  }

  getAccountBook( id : number ) : Observable<AccountBook> {
    return this.httpClient.get<AccountBook>( this.apiUrl + '/' + id)
      .pipe( tap( (data ) => {
      this._accountBookDetail.set( data );
      })
    )
  }

  postAccountBook( newAccountingBook : {} ): Observable<AccountBook> {
    return this.httpClient.post<AccountBook>( this.apiUrl + '/create', newAccountingBook)
    .pipe(
      tap( ( data ) => {
        console.log( data );
        this.addAccount( data );
      })
    )
  }

  putAccountBook( modifiedAccountBook : {} ): Observable<AccountBook> {
    return this.httpClient.put<AccountBook>( this.apiUrl + '/update', modifiedAccountBook)
    .pipe(
      tap( (data) => {
        console.log( data );
        this.changeAccountBook( data );
      })
    )
  }
}
