import { TestBed } from '@angular/core/testing';

import { IntialDataService } from './intial-data.service';

describe('IntialDataService', () => {
  let service: IntialDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(IntialDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
