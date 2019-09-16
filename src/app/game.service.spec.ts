import { TestBed } from '@angular/core/testing';

import { GameService } from './game.service';

describe('CourseService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('makes new game', () => {
    const service: GameService = TestBed.get(GameService);
    expect(service).toBeTruthy();
  });
});