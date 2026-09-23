import { Component, OnInit, inject } from '@angular/core';
import { RouterLink } from '@angular/router';

import { AccountBookFormComponent } from '../../components/account-book-form/account-book-form.component';
import { AccountBook } from '../../../../models/account-book';
import { AccountBookService } from '../../services/account-book.service';

import { MatTableModule } from '@angular/material/table';
import { MatButtonModule} from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import {MatFormFieldModule} from '@angular/material/form-field';

@Component({
  selector: 'app-books-page',
  standalone: true,
  imports: [
    RouterLink,
    AccountBookFormComponent,
    MatTableModule,
    MatButtonModule,
    MatCardModule,
    MatFormFieldModule
  ],
  templateUrl: './books-page.component.html',
  styleUrl: './books-page.component.css'
})
export class BooksPageComponent {
  displayedColumns: string[] = ['name', 'description', 'action'];
  showForm!: boolean;
  bookForUpdate?: AccountBook;
  formTitle!: String;

  private accountBookService = inject( AccountBookService);
  accountBooks = this.accountBookService.accountBooks;

  ngOnInit(): void {
    this.showForm = false;

    this.accountBookService.getAccountBooks().subscribe();
  }

  onShowForm( formTitle: String, keepDisplay?: boolean, account?: AccountBook) {
    if(formTitle){this.formTitle = formTitle}

    if( this.showForm == true && keepDisplay != true ){ this.showForm = false }
    else{ this.showForm = true }

     if( this.showForm == true ){
      if( account != null ){
        this.bookForUpdate = account;
      } else { this.bookForUpdate = undefined;}
    }
  }
}
