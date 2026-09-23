import { Routes } from '@angular/router';
import { HomeComponent } from './home/home/home.component';
import { AccountsPageComponent } from './features/financial-account/pages/accounts-page/accounts-page.component';
import { AccountDetailPageComponent } from './features/financial-account/pages/account-detail-page/account-detail-page.component';
import { BooksPageComponent } from './features/account-book/pages/books-page/books-page.component';
import { BookDetailsPageComponent } from './features/account-book/pages/book-details-page/book-details-page.component';

export const routes: Routes = [
    { path: 'home', component: HomeComponent },
    { path: 'accounts', component: AccountsPageComponent },
    { path: 'account-details/:accountId', component: AccountDetailPageComponent },
    { path: 'books', component: BooksPageComponent},
    { path: 'book-details/:bookId', component: BookDetailsPageComponent}
];
