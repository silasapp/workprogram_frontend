import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OMLRecalibratedScaleComponent } from './oml-recalibrated-scale.component';

describe('OMLRecalibratedScaleComponent', () => {
  let component: OMLRecalibratedScaleComponent;
  let fixture: ComponentFixture<OMLRecalibratedScaleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OMLRecalibratedScaleComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OMLRecalibratedScaleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
