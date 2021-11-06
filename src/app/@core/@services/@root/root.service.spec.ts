/* tslint:disable:no-unused-variable */

import { HttpClientModule } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed, async, inject } from '@angular/core/testing';
import { RootService } from './root.service';

describe('Service: Root', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule], 
      providers: [RootService]
    });
  });

  it('should ...', inject([RootService], (service: RootService) => {
    expect(service).toBeTruthy();
  }));
});
