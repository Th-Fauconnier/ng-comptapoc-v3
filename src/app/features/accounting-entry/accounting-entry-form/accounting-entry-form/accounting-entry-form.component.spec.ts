import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AccountingEntryFormComponent } from './accounting-entry-form.component';

describe('AccountingEntryFormComponent', () => {
  let component: AccountingEntryFormComponent;
  let fixture: ComponentFixture<AccountingEntryFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AccountingEntryFormComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AccountingEntryFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
