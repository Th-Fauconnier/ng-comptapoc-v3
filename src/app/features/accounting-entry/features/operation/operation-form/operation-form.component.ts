import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import {formatDate} from '@angular/common';
import { FormControl } from '@angular/forms';

import { FinancialAccount } from '../../../../../models/financial-account.model';

import { MatButtonModule} from '@angular/material/button';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {provideNativeDateAdapter} from '@angular/material/core';

@Component({
  selector: 'app-operation-form',
  standalone: true,
  providers: [provideNativeDateAdapter()],
  imports: [
    ReactiveFormsModule,
    MatButtonModule,
    MatInputModule,
    MatFormFieldModule,
    MatDatepickerModule
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './operation-form.component.html',
  styleUrl: './operation-form.component.css'
})
export class OperationFormComponent {
  @Input() financialAccountList!: FinancialAccount[]
  @Output() addOperation = new EventEmitter();

  private formBuilder = inject( FormBuilder );

  formOperation: FormGroup;

  constructor(){
    this.formOperation = this.formBuilder.group({
    label: '',
    amount: null,
    financialAccount: FinancialAccount,
    date: new FormControl<Date | null>(null)
    })
  }

  //dateControl = new FormControl<Date | null>(null);
  onSubmit(){
    console.log( this.formOperation )
    this.addOperation.emit(
      { 
        id: undefined,
        amount: this.formOperation.value.amount,
        financialAccount: this.formOperation.value.financialAccount,
        label: this.formOperation.value.label,
        date: formatDate(
          this.formOperation.value.date? this.formOperation.value.date : '',
           'yyyy-MM-dd', 'en'
          )
      }
    );
  }
}
