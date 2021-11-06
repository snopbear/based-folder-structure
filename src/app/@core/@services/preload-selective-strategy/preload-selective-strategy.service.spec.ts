/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { PreloadSelectiveStrategyService } from './preload-selective-strategy.service';

describe('Service: PreloadSelectiveStrategy', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PreloadSelectiveStrategyService]
    });
  });

  it('should ...', inject([PreloadSelectiveStrategyService], (service: PreloadSelectiveStrategyService) => {
    expect(service).toBeTruthy();
  }));
});
