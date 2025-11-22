import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MovingText } from './moving-text';

describe('MovingText', () => {
  let component: MovingText;
  let fixture: ComponentFixture<MovingText>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MovingText]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MovingText);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
