import { Component, OnInit, Input } from '@angular/core';
import { AccountBook } from '../../../../models/account-book';
import { AccountingEntryComponent } from '../../../accounting-entry/accounting-entry/accounting-entry.component';
import { AccountingEntryFormComponent } from '../../../accounting-entry/accounting-entry-form/accounting-entry-form/accounting-entry-form.component';
import { FinancialAccount } from '../../../../models/financial-account.model';

import { MatTableModule } from '@angular/material/table';
import { MatButtonModule} from '@angular/material/button';

@Component({
  selector: 'app-account-book',
  standalone: true,
  imports: [
    AccountingEntryComponent,
    AccountingEntryFormComponent,
    MatTableModule,
    MatButtonModule
  ],
  templateUrl: './account-book.component.html',
  styleUrl: './account-book.component.css'
})
export class AccountBookComponent {
  @Input() accountBook!: AccountBook;
  @Input() financialAccountList!: FinancialAccount[];

 // displayedColumns: string[] = ['N°', 'code', 'Libellé', 'Débit', 'Crédit']
  showEntryForm!: boolean;

  ngOnInit(): void {
    this.showEntryForm = false;
  }

  onShowEntryForm(): void{
    if( this.showEntryForm ) {
      this.showEntryForm = false;
    }else {
      this.showEntryForm = true;
    }
  }
}
