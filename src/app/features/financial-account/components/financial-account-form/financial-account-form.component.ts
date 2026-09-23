import { Component, Input, Output, inject, SimpleChange, effect } from '@angular/core';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { FinancialAccountService } from '../../services/financial-account.service';
import { FinancialAccount } from '../../../../models/financial-account.model';
import { MatButtonModule} from '@angular/material/button';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';

@Component({
  selector: 'app-financial-account-form',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatButtonModule,
    MatInputModule,
    MatFormFieldModule
  ],
  templateUrl: './financial-account-form.component.html',
  styleUrl: './financial-account-form.component.css'
})
export class FinancialAccountFormComponent {
  private formBuilder = inject( FormBuilder );
  private financialAccountService = inject( FinancialAccountService );

  @Input() accountForUpdate?: FinancialAccount | undefined;
  @Input() formTitle!: String;
  form = this.formBuilder.group(
      {
      name: this.accountForUpdate? this.accountForUpdate.name : '',
      code: this.accountForUpdate? this.accountForUpdate.code : ''
    })

  private initFormContent(){
    this.form = this.formBuilder.group(
    {
      name: this.accountForUpdate? this.accountForUpdate.name : '',
      code: this.accountForUpdate? this.accountForUpdate.code : ''
    })
  }
  ngOnInit() {
    this.initFormContent();
  }

  ngOnChange( accountChanged: SimpleChange){
    effect (()=> {
      this.initFormContent();
    })
  }

  submitted: boolean = false;

  onSubmit() {
    this.submitted = true;
    
    if( this.accountForUpdate == undefined ){
       this.financialAccountService.postFinancialAccount( {
        name : this.form.value.name,
        code : this.form.value.code
      } ).subscribe( (response: any) => {
        console.log( response );
      } ) 
    } else {
      this.financialAccountService.putFinancialAccount( {
        id : this.accountForUpdate.id,
        name : this.form.value.name,
        code : this.form.value.code
      }).subscribe( (response: any ) => {
        this.accountForUpdate = undefined;
        console.log( response );
      })
    }
  }

  /* handleCancel() : void {
    this.cancelForm.emit();
  } */
}
