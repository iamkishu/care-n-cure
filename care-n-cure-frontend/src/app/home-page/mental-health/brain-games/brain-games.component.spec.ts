import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BrainGamesComponent } from './brain-games.component';

describe('BrainGamesComponent', () => {
  let component: BrainGamesComponent;
  let fixture: ComponentFixture<BrainGamesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BrainGamesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BrainGamesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
