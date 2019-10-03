import { TestBed } from '@angular/core/testing';

import { DbconnectService } from './dbconnect.service';

describe('DbconnectService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: DbconnectService = TestBed.get(DbconnectService);
    expect(service).toBeTruthy();
  });
});
