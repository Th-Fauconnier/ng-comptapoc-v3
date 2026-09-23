import { Component, EventEmitter, inject, Input, Output, OnChanges, model } from '@angular/core';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';

import { AccountBook } from '../../../../models/account-book';
import { AccountBookService } from '../../services/account-book.service';

import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';

@Component({
  selector: 'app-book-selector',
  standalone: true,
  imports: [
    MatFormFieldModule,
    ReactiveFormsModule,
    MatInputModule
  ],
  templateUrl: './book-selector.component.html',
  styleUrl: './book-selector.component.css'
})
export class BookSelectorComponent {
  private formBuilder = inject( FormBuilder );
  private accountBookService: AccountBookService = inject( AccountBookService );
  accountBookList = this.accountBookService.accountBooks;
  
  @Input() selectorLabel: String = 'Selection'
  @Output() handleSelection = new EventEmitter();

  formBookSelector = this.formBuilder.group({
    accoutingBook: AccountBook
  })


  ngOnInit(){
    this.accountBookService.getAccountBooks().subscribe();
  }

  onSubmitBook(){
   // console.log(this.bookSelected)
    this.handleSelection.emit( 
      this.formBookSelector.value.accoutingBook 
    )
  }
}
