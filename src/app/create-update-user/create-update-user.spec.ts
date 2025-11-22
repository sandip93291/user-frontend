import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateUpdateUser } from './create-update-user';

describe('CreateUpdateUser', () => {
  let component: CreateUpdateUser;
  let fixture: ComponentFixture<CreateUpdateUser>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CreateUpdateUser]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateUpdateUser);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
