import { Component, Input, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { AccountBookService } from '../../services/account-book.service';
import { AccountingEntry } from '../../../../models/accounting-entry';
import { AccountingEntryFormComponent } from '../../../accounting-entry/accounting-entry-form/accounting-entry-form/accounting-entry-form.component';

import { MatTableModule } from '@angular/material/table';
import { MatButtonModule} from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { DatePipe } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';

@Component({
  selector: 'app-book-details-page',
  standalone: true,
  imports: [
    AccountingEntryFormComponent,
    MatTableModule,
    MatButtonModule,
    MatCardModule,
    DatePipe,
    MatFormFieldModule
  ],
  templateUrl: './book-details-page.component.html',
  styleUrl: './book-details-page.component.css'
})
export class BookDetailsPageComponent {
   route = inject( ActivatedRoute );
   readonly displayColumns: String[] = ["N° de l'entrée", "Détails"]
   readonly displayedOperationColumns: String[] = ['Débiteur', 'Créditeur', 'label', 'Débit', 'Crédit']

   private accountBookService: AccountBookService = inject( AccountBookService );
   accountBook = this.accountBookService.accountBookDetail;
   entries: AccountingEntry[] = [];

   @Input() formTitle!: String;

   ngOnInit(){
    this.showEntryForm = false;
    const bookId = this.route.snapshot.params['bookId'];
    this.accountBookService.getAccountBook( bookId ).subscribe( ( Response:any) => {
      this.entries = Response.accountingEntries.sort( (a: AccountingEntry, b: AccountingEntry) => a.id - b.id );
    });
   }

   showEntryForm!: boolean;

  onShowEntryForm( formTitle: String, keepDisplay?: boolean, entry?: AccountingEntry): void{
    if(formTitle){this.formTitle = formTitle}
    if( this.showEntryForm && keepDisplay != true ) {
      this.showEntryForm = false;
    }else {
      this.showEntryForm = true;
    }

  }
}
