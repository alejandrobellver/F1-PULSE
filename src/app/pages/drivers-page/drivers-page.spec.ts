import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DriversPage } from './drivers-page';

describe('DriversPage', () => {
  let component: DriversPage;
  let fixture: ComponentFixture<DriversPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DriversPage]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DriversPage);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
