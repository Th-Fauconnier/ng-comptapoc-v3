import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AccountingEntryComponent } from './accounting-entry.component';

describe('AccountingEntryComponent', () => {
  let component: AccountingEntryComponent;
  let fixture: ComponentFixture<AccountingEntryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AccountingEntryComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AccountingEntryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
