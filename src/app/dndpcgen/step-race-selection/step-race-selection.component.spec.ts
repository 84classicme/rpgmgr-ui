import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StepRaceSelectionComponent } from './step-race-selection.component';

describe('StepRaceSelectionComponent', () => {
  let component: StepRaceSelectionComponent;
  let fixture: ComponentFixture<StepRaceSelectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StepRaceSelectionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StepRaceSelectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
