import { TestBed } from '@angular/core/testing';

import { AthurService } from './athur.service';

describe('AthurService', () => {
  let service: AthurService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AthurService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
