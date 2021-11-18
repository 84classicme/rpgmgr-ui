import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DndpcgenComponent } from './dndpcgen.component';

describe('DndpcgenComponent', () => {
  let component: DndpcgenComponent;
  let fixture: ComponentFixture<DndpcgenComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DndpcgenComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DndpcgenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
