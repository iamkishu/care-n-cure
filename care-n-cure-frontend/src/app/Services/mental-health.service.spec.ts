import { TestBed } from '@angular/core/testing';

import { MentalHealthService } from './mental-health.service';

describe('MentalHealthService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: MentalHealthService = TestBed.get(MentalHealthService);
    expect(service).toBeTruthy();
  });
});
