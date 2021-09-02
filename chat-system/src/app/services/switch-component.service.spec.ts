import { TestBed } from '@angular/core/testing';

import { SwitchComponentService } from './switch-component.service';

describe('SwitchComponentService', () => {
  let service: SwitchComponentService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SwitchComponentService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
