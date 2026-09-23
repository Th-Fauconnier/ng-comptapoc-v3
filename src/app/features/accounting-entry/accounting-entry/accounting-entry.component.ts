import { Component, Input } from '@angular/core';
import { AccountingEntry } from '../../../models/accounting-entry';

@Component({
  selector: 'app-accounting-entry',
  standalone: true,
  imports: [],
  templateUrl: './accounting-entry.component.html',
  styleUrl: './accounting-entry.component.css'
})
export class AccountingEntryComponent {
  @Input() entry!: AccountingEntry;
}
