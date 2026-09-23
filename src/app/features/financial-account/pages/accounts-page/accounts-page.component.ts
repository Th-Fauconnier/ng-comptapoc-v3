import { Component, OnInit, inject} from '@angular/core';
import { RouterLink } from '@angular/router';
import { FinancialAccountFormComponent } from '../../components/financial-account-form/financial-account-form.component';
import { FinancialAccountService } from '../../services/financial-account.service';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule} from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { FinancialAccount } from '../../../../models/financial-account.model';

@Component({
  selector: 'app-accounts-page',
  standalone: true,
  imports: [ 
    RouterLink,
    FinancialAccountFormComponent,
    MatTableModule,
    MatButtonModule,
    MatCardModule
  ],
  templateUrl: './accounts-page.component.html',
  styleUrl: './accounts-page.component.css'
})
export class AccountsPageComponent implements OnInit {
  displayedColumns: string[] = ['code', 'name', 'action'];
  showForm!: boolean;
  accountForUpdate?: FinancialAccount;
  formTitle!: String;

  private financialAccountService = inject( FinancialAccountService );
  /* financialAccounts = this.financialAccountService.faccounts; */
  financialAccounts = this.financialAccountService.financialAccounts;

  ngOnInit(): void {
    this.showForm = false;
    this.financialAccountService.getFinancialAccounts().subscribe();
  }

  onShowForm( formTitle: String, keepDisplay?: boolean, account?: FinancialAccount){
    if(formTitle){this.formTitle = formTitle}

    if( this.showForm == true && keepDisplay != true){ this.showForm = false }
    else{ this.showForm = true }
    
    if( this.showForm == true ){
      if( account != null ){
        this.accountForUpdate = account;
      } else { this.accountForUpdate = undefined;}
    }
  }
  
  giveTotalOfCredits( faccount: FinancialAccount){
    return this.financialAccountService.giveTotalCreditsForFinancialAccount( faccount );
  }

  giveTotalOfDebits( faccount: FinancialAccount){
    return this.financialAccountService.giveTotalCreditsForFinancialAccount( faccount );
  }

}
