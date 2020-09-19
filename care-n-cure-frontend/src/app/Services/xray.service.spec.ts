import { TestBed } from '@angular/core/testing';

import { XrayService } from './xray.service';

describe('XrayService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: XrayService = TestBed.get(XrayService);
    expect(service).toBeTruthy();
  });
});
