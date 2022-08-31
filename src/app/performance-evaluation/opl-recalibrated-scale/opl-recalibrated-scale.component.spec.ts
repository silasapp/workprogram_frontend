import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OPLRecalibratedScaleComponent } from './opl-recalibrated-scale.component';

describe('OPLRecalibratedScaleComponent', () => {
  let component: OPLRecalibratedScaleComponent;
  let fixture: ComponentFixture<OPLRecalibratedScaleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OPLRecalibratedScaleComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OPLRecalibratedScaleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
