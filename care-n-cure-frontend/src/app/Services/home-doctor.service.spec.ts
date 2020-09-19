import { TestBed } from '@angular/core/testing';

import { HomeDoctorService } from './home-doctor.service';

describe('HomeDoctorService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: HomeDoctorService = TestBed.get(HomeDoctorService);
    expect(service).toBeTruthy();
  });
});
