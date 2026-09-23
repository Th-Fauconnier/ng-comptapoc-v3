import { Component, signal, Input, inject, Output, EventEmitter } from '@angular/core';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';

import { AccountingEntryServiceService } from '../../services/accounting-entry.service';
import { FinancialAccountService } from '../../../financial-account/services/financial-account.service';

import { AccountBook } from '../../../../models/account-book';
import { Operation } from '../../../../models/operation.model';
import { BookSelectorComponent } from '../../../account-book/components/book-selector/book-selector.component';
import { OperationFormComponent } from '../../features/operation/operation-form/operation-form.component';

import { DatePipe } from '@angular/common';
import {formatDate} from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatTableModule } from '@angular/material/table';
import { MatCardModule } from '@angular/material/card';
import { FinancialAccount } from '../../../../models/financial-account.model';

@Component({
  selector: 'app-accounting-entry-form',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    BookSelectorComponent,
    OperationFormComponent,
    MatButtonModule,
    DatePipe,
    MatInputModule,
    MatFormFieldModule,
    MatTableModule,
    MatCardModule
  ],
  templateUrl: './accounting-entry-form.component.html',
  styleUrl: './accounting-entry-form.component.css'
})
export class AccountingEntryFormComponent {
  private formBuilder = inject( FormBuilder );
  private accountingEntryService: AccountingEntryServiceService = inject( AccountingEntryServiceService );

  private financialAccountService: FinancialAccountService = inject( FinancialAccountService );
  financialAccountList = this.financialAccountService.financialAccounts;

  readonly displayedOperationColumns: String[] = ['Débiteur', 'Créditeur', 'label', 'Débit', 'Crédit']

  @Input() accountingBook?: AccountBook;
  @Input() defaultFinancialAccount?: FinancialAccount;
  @Input() formTitle! : String;
  @Output() handleClose = new EventEmitter();

  accountingBookSelected : AccountBook | undefined

  form = this.formBuilder.group({
    label: '',
    accountingBook: this.accountingBook? this.accountingBook : undefined
  })

  private initFormContent(){
    this.form = this.formBuilder.group({
        label: '',
        accountingBook: this.accountingBook? this.accountingBook : undefined
      })
  }

  ngOnInit(){
    this.initFormContent();
    this.financialAccountService.getFinancialAccounts().subscribe();
  }

  handleBookSelection(bookSelected: AccountBook){
    this.accountingBookSelected = bookSelected
  }

  operations= signal<Operation[]>([]);
  addingOperation(operationAdded: Operation ){
    console.log(operationAdded);
    this.operations.update( operations => [...operations, operationAdded])
    console.log( this.operations );
  }

  showOperationForm = false;
  onShowOperationForm(){
    if( this.showOperationForm ) {
      this.showOperationForm = false;
      this.form.value.label ='';
    } else { this.showOperationForm = true; }
  }

  concernedAccountingBook(){
    if( this.accountingBook ) {
      return { id: this.accountingBook.id }
    } else {
      return { id: this.accountingBookSelected? this.accountingBookSelected.id : undefined }
    }
  }



  //today: number = Date.now();
  submitted: boolean = false;
  onSubmit() {
    
    this.submitted = true;
    if(this.operations().length >= 2 ){
      
      this.accountingEntryService.postAccountingEntry( {
        label : this.form.value.label,
        date : formatDate(new Date(), 'yyyy-MM-dd HH:mm', 'en'),
        accountingBook : this.concernedAccountingBook(),
        operations: this.operations()
      }).subscribe( ( response: any ) => {
        this.handleClose.emit("finishWithSuccess")
        console.log( response );
      })
    }
  }
}
