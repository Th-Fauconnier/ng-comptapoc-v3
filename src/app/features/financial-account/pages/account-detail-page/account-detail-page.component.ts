import { Component, Input, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { AccountingEntry } from '../../../../models/accounting-entry';
import { FinancialAccountService } from '../../services/financial-account.service';
import { AccountingEntryFormComponent } from '../../../accounting-entry/accounting-entry-form/accounting-entry-form/accounting-entry-form.component';

import { MatTableModule } from '@angular/material/table';
import { MatButtonModule} from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { DatePipe } from '@angular/common';
import { Operation } from '../../../../models/operation.model';

@Component({
  selector: 'app-account-detail-page',
  standalone: true,
  imports: [
    AccountingEntryFormComponent,
    MatTableModule,
    MatButtonModule,
    MatCardModule,
    DatePipe
],
  templateUrl: './account-detail-page.component.html',
  styleUrl: './account-detail-page.component.css'
})
export class AccountDetailPageComponent {
  route = inject( ActivatedRoute );
  readonly displayColumns: string[] = ['date', 'label', 'crédit', 'débit']
  
  private financialAccountService: FinancialAccountService = inject( FinancialAccountService );
  financialAccount = this.financialAccountService.financialAccountDetail;
  operations: Operation[] = [];

  @Input() formTitle!: String;
  showEntryForm!: boolean;

  ngOnInit(){
    this.showEntryForm = false;
    const accountId = this.route.snapshot.params['accountId']
    this.financialAccountService.getFinancialAccount( accountId ).subscribe( (Response: any) => {
      //sorting by asc date
      this.operations = Response.operations.sort((a: Operation, b: Operation) => new Date(a.date).getTime() - new Date(b.date).getTime());
    });
  }

  onShowEntryForm( formTitle: String, keepDisplay?: boolean, entry?: AccountingEntry): void{
      if(formTitle){this.formTitle = formTitle}
      if( this.showEntryForm && keepDisplay != true ) {
        this.showEntryForm = false;
      }else {
        this.showEntryForm = true;
      }
  
    }

    closeForm( status: String){
      if( status = "finishWithSuccess"){
        this.showEntryForm = false;
      }
    }
}
