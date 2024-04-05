import { TestBed } from '@angular/core/testing';

import { CelluleService } from './cellule.service';

describe('CelluleService', () => {
  let service: CelluleService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CelluleService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
