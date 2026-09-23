import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AccountBookFormComponent } from './account-book-form.component';

describe('AccountBookFormComponent', () => {
  let component: AccountBookFormComponent;
  let fixture: ComponentFixture<AccountBookFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AccountBookFormComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AccountBookFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
