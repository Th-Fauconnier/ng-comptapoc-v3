import { Component, Input } from '@angular/core';
import { DatePipe } from '@angular/common';
import { FinancialAccount } from '../../../../models/financial-account.model';

@Component({
  selector: 'app-financial-account',
  standalone: true,
  imports: [ DatePipe ],
  templateUrl: './financial-account.component.html',
  styleUrl: './financial-account.component.css'
})
export class FinancialAccountComponent {
  @Input() faccount!: FinancialAccount;

   getCreditsSum(){
      let creditSum: number = 0;
      if( this.faccount && this.faccount.operations && this.faccount.operations.length > 0 ){
        for( let operation of this.faccount.operations ){
            if( operation.amount > 0 ){ 
               creditSum += operation.amount;
            }
        }
      }
      return creditSum;
    }

    getDebitSum(){
      let debitSUm: number = 0;
      if( this.faccount && this.faccount.operations && this.faccount.operations.length > 0 ){
        for( let operation of this.faccount.operations ){
            if( operation.amount < 0 ){
                debitSUm += operation.amount;
            }
        }
      }
      return debitSUm;
    }
}
