import { TestBed } from '@angular/core/testing';

import { SlideDialogService } from './slide-dialog.service';

describe('SlideDialogService', () => {
  let service: SlideDialogService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SlideDialogService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
