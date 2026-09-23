import { signal, inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, Observable, tap } from 'rxjs';

import { environment } from '../../../env/environment.development';
import { FinancialAccount } from '../../../models/financial-account.model';
import { ToastService } from '../../../services/toastService/toast.service';

@Injectable({
  providedIn: 'root'
})
export class FinancialAccountService {

  private httpClient = inject ( HttpClient );
  private toast = inject(ToastService);
  private readonly apiUrl = environment.apiUrl + '/financialAccount';

  private _financialAccounts = signal<FinancialAccount[]>([]);
  readonly financialAccounts = this._financialAccounts.asReadonly();

  private _financialAccountDetail = signal<FinancialAccount>( {} as FinancialAccount );
  readonly financialAccountDetail = this._financialAccountDetail.asReadonly();

  private addFinancialAccount( financialAccount: FinancialAccount ){
    this._financialAccounts.update( financialAccounts => [...financialAccounts, financialAccount] );
  }

  private changeFinancialAccount( modifiedFinancialAccount : FinancialAccount ){
  //  const index = this._financialAccounts.
    this._financialAccounts.update( currentFaccounts => {
      return currentFaccounts.map( faccount =>
        faccount.id === modifiedFinancialAccount.id ? modifiedFinancialAccount : faccount
      );
    });
  }

   getFinancialAccounts(): Observable<FinancialAccount[]> {
    return this.httpClient.get<FinancialAccount[]>( this.apiUrl + '/all')
    .pipe(
      tap( ( data ) => {
        console.log( data );
        this._financialAccounts.set( data );
        //todo temp add fake data
       // this._financialAccounts.set( [...data, ...this.faccounts] );
      }),
      catchError( (error) => {
        this.toast.error( 'Impossible de récupérer les comptes' );
        throw error;
      })
    )
  }
  
  getFinancialAccount( id : number ) : Observable<FinancialAccount> {
    return this.httpClient.get<FinancialAccount>( this.apiUrl + '/' + id)
    .pipe( tap( ( data ) => {
      console.log( data );
        this._financialAccountDetail.set( data )
      }),
      catchError( (error) => {
        this.toast.error( 'Erreur serveur: Impossible de récuperer le compte' )
        throw error;
      })
    )
  }

  postFinancialAccount( newFinancialAccount : {} ): Observable<FinancialAccount> {
    return this.httpClient.post<FinancialAccount>( this.apiUrl + '/create', newFinancialAccount )
    .pipe(
      tap( ( data ) => {
        console.log( data )
        this.addFinancialAccount( data );
        this.toast.success('Le compte à été créer avec succés' );
      }),
      catchError( (error) => {
        this.toast.error('Impossible de créer le compte.' );
        throw error;
      })
    )
  }

  putFinancialAccount( modifiedFinancialAccount: {} ): Observable<FinancialAccount> {
    return this.httpClient.put<FinancialAccount>( this.apiUrl + '/update', modifiedFinancialAccount )
    .pipe(
      tap( ( data ) => {
        this.changeFinancialAccount( data )
        this.toast.success('Le compte à bien été mis à jour');
      }),
      catchError( (error) => {
        this.toast.error('Impossible de mettre le compte à jour.')
        throw error;
      })
    )
  }

  giveTotalCreditsForFinancialAccount( faccount: FinancialAccount ){
    let credits = 0;
    if( faccount.operations.length > 0 ){
      faccount.operations.forEach( operation => {
        if( operation.amount > 0 ){
          credits += operation.amount;
        }
      })
    }
    return credits;
  }

  giveTotalDebitsForFinancialAccount( faccount: FinancialAccount ){
    let debits = 0;
    if( faccount.operations.length < 0 ){
      faccount.operations.forEach( operation => {
        if( operation.amount > 0 ){
          debits += operation.amount;
        }
      })
    }
    return debits;
  }
}
