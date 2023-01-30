import { TestBed } from '@angular/core/testing';

import { DomTreeService } from './dom-tree.service';

describe('DomTreeService', () => {
  let service: DomTreeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DomTreeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
