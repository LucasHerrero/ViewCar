import { TestBed } from '@angular/core/testing';

import { SelectedBrandService } from './configurador/services/selected-brand.service';

describe('ServicesService', () => {
  let service: SelectedBrandService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SelectedBrandService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
