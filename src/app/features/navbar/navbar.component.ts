import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [
    MatButtonModule
  ],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {
  constructor(private router: Router) {}

    goToIndex() {
      this.router.navigate(['/', 'home']);
    }
    goToAccountsPage() {
      this.router.navigate(['/', 'accounts']);
    }
    gotToAccountDetailPage(){
      this.router.navigate(['/', 'account-details']);
    }
    goToBooks(){
      this.router.navigate(['/', 'books'])
    }
}
