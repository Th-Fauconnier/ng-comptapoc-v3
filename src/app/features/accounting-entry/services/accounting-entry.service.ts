import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, Observable, tap } from 'rxjs';

import { environment } from '../../../env/environment.development';
import { AccountingEntry } from '../../../models/accounting-entry';
import { ToastService } from '../../../services/toastService/toast.service';

@Injectable({
  providedIn: 'root'
})
export class AccountingEntryServiceService {

  private httpClient = inject( HttpClient );
  private toast = inject(ToastService);
  private readonly apiUrl = environment.apiUrl + '/accountingEntry'

  postAccountingEntry( newEntry : {} ): Observable<AccountingEntry> {
    console.log('form entry service : ')
    console.log( newEntry )
    return this.httpClient.post<AccountingEntry>( this.apiUrl + '/create', newEntry)
    .pipe(
      tap( (data ) => {
        this.toast.success('Nouvelle entrée crée avec succès')
      }),
      catchError( (error) => {
        this.toast.error( 'Erreur serveur: Impossible de créer l\'entrée');
        throw error;
      })
    )
  }
}
