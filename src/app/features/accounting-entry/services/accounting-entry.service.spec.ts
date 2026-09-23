import { TestBed } from '@angular/core/testing';

import { AccountingEntryServiceService } from './accounting-entry-service.service';

describe('AccountingEntryServiceService', () => {
  let service: AccountingEntryServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AccountingEntryServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
