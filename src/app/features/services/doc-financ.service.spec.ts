import { TestBed } from '@angular/core/testing';

import { DocFinancService } from './doc-financ.service';

describe('DocFinancService', () => {
  let service: DocFinancService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DocFinancService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
