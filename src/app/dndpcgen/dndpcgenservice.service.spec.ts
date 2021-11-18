import { TestBed } from '@angular/core/testing';

import { DndpcgenserviceService } from './dndpcgenservice.service';

describe('DndpcgenserviceService', () => {
  let service: DndpcgenserviceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DndpcgenserviceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
