import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OPLAggregatedScoreComponent } from './opl-aggregated-score.component';

describe('OPLAggregatedScoreComponent', () => {
  let component: OPLAggregatedScoreComponent;
  let fixture: ComponentFixture<OPLAggregatedScoreComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OPLAggregatedScoreComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OPLAggregatedScoreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
