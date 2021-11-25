/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { FakeApiService } from './fake-api.service';

describe('Service: FakeApi', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [FakeApiService]
    });
  });

  it('should ...', inject([FakeApiService], (service: FakeApiService) => {
    expect(service).toBeTruthy();
  }));
});
