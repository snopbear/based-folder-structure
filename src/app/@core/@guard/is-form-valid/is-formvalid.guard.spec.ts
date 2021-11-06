import { TestBed } from '@angular/core/testing';

import { IsFormvalidGuard } from './is-formvalid.guard';

describe('IsFormvalidGuard', () => {
  let guard: IsFormvalidGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(IsFormvalidGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
