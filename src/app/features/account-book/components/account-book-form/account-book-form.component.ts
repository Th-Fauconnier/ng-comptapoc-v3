import { Component, EventEmitter, Input, Output, inject, SimpleChange, effect } from '@angular/core';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';

import { AccountBookService } from '../../services/account-book.service';
import { AccountBook } from '../../../../models/account-book';

import { MatButtonModule} from '@angular/material/button';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';

@Component({
  selector: 'app-account-book-form',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule
  ],
  templateUrl: './account-book-form.component.html',
  styleUrl: './account-book-form.component.css'
})
export class AccountBookFormComponent {
  private formBuilder = inject( FormBuilder );
  private acccountBookService = inject( AccountBookService );

  @Input() bookForUpdate?: AccountBook | undefined;
  @Input() formTitle!: String;
  form = this.formBuilder.group({
    name: '',
    description: ''
  });

  private initFormContent(){
    this.form = this.formBuilder.group(
    {
      name : this.bookForUpdate? this.bookForUpdate.name : '',
      description : this.bookForUpdate? this.bookForUpdate.description : ''
    })
  } 

  ngOnInit() {
    this.initFormContent();
  }

  ngOnchange( bookChanged: SimpleChange ){
    effect(()=>{
      this.initFormContent();
    })
  }

  submitted: boolean = false;

  onSubmit(){
    this.submitted = true;

    if( this.bookForUpdate == undefined ){
      this.acccountBookService.postAccountBook( {
          name: this.form.value.name,
          description: this.form.value.description
      } ).subscribe( (response: any) => {
          console.log( response )
      });
    } else {
      this.acccountBookService.putAccountBook( {
        id : this.bookForUpdate.id,
        name : this.form.value.name,
        description : this.form.value.description
      }).subscribe( ( response: any) => {
        this.bookForUpdate = undefined;
        console.log( response )
      })
    }
    
  }

}
