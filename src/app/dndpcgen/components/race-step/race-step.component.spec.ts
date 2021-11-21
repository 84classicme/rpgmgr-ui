import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RaceStepComponent } from './race-step.component';

describe('RaceStepComponent', () => {
  let component: RaceStepComponent;
  let fixture: ComponentFixture<RaceStepComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RaceStepComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RaceStepComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
